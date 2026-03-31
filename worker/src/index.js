/**
 * Cloudflare Worker for Alumni Forum (Luntan)
 * Backend using D1 for database and R2 for storage
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS headers for WeChat Mini Program
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Secret',
      'Content-Type': 'application/json'
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. GET /api/records - Fetch list of records
      if (path === '/api/records' && method === 'GET') {
        const page = parseInt(url.searchParams.get('page') || '0');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const offset = page * limit;

        const { results } = await env.DB.prepare(`
          SELECT id as _id, title, summary, publish_date as publishDate 
          FROM meeting_records 
          ORDER BY publish_date DESC 
          LIMIT ? OFFSET ?
        `).bind(limit, offset).all();

        return new Response(JSON.stringify({ data: results }), { headers: corsHeaders });
      }

      // 2. GET /api/records/:id - Fetch single record detail
      const recordMatch = path.match(/^\/api\/records\/(\d+)$/);
      if (recordMatch && method === 'GET') {
        const id = recordMatch[1];
        const result = await env.DB.prepare(`
          SELECT id as _id, title, content, publish_date as publishDate 
          FROM meeting_records 
          WHERE id = ?
        `).bind(id).first();

        if (!result) {
          return new Response(JSON.stringify({ error: 'Record not found' }), {
            status: 404,
            headers: corsHeaders
          });
        }

        return new Response(JSON.stringify({ data: result }), { headers: corsHeaders });
      }

      // 3. POST /api/records - Create or update a record (for admin)
      // Note: In production, this should be protected by an API Key or JWT
      if (path === '/api/records' && method === 'POST') {
        const body = await request.json();
        const { id, title, content, summary, publishDate } = body;

        if (id) {
          // Update
          await env.DB.prepare(`
            UPDATE meeting_records 
            SET title = ?, content = ?, summary = ?, publish_date = ?
            WHERE id = ?
          `).bind(title, content, summary, publishDate, id).run();
          
          return new Response(JSON.stringify({ success: true, id }), { headers: corsHeaders });
        } else {
          // Insert
          const info = await env.DB.prepare(`
            INSERT INTO meeting_records (title, content, summary, publish_date)
            VALUES (?, ?, ?, ?)
          `).bind(title, content, summary, publishDate).run();
          
          return new Response(JSON.stringify({ success: true, id: info.meta.last_row_id }), { headers: corsHeaders });
        }
      }

      // 4. Default 404
      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: corsHeaders
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};
