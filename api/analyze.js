/**
 * Vercel 서버리스 함수: /api/analyze
 * 분석 로직은 src/worker.js 의 analyze() 를 그대로 씁니다. (키는 Vercel 환경 변수 GEMINI_API_KEY)
 * 실행 지역은 vercel.json 의 regions 로 미국에 고정합니다(Google이 일부 지역에서 오는 호출을 막기 때문).
 */
import { analyze } from '../src/worker.js';

export default {
  async fetch(request) {
    // Vercel 뒤에서는 request.url 의 주소가 내부 주소일 수 있어, 사용자가 접속한 주소(host)로 출처를 맞춥니다.
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || new URL(request.url).host;
    const url = new URL('https://' + host + new URL(request.url).pathname);
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ ok: false, error: 'POST로만 쓸 수 있습니다.' }), { status: 405, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }
    return analyze(request, process.env, url);
  }
};
