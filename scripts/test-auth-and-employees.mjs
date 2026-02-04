import fetch from 'node-fetch';
import 'dotenv/config';

const base = process.env.DEV_BASE_URL || 'http://localhost:8081';

async function login(username, password){
  const res = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    // node-fetch won't store cookies between requests automatically; capture set-cookie
  });
  const data = await res.json().catch(()=>null);
  const cookies = res.headers.get('set-cookie');
  return { ok: res.ok, data, cookies };
}

async function getEmployees(cookie){
  const headers = { 'Content-Type': 'application/json' };
  if(cookie) headers['cookie'] = cookie;
  const res = await fetch(`${base}/api/employees`, { headers });
  const data = await res.json().catch(()=>null);
  return { ok: res.ok, status: res.status, data };
}

async function main(){
  console.log('Logging in as admin (admin/Admin@123)');
  const loginRes = await login('admin', 'Admin@123');
  console.log('login:', loginRes.ok, loginRes.data);
  const cookie = loginRes.cookies;
  console.log('cookie header length:', cookie ? cookie.length : 0);

  const empRes = await getEmployees(cookie);
  console.log('employees fetch:', empRes.status, JSON.stringify(empRes.data, null, 2));
}

main();
