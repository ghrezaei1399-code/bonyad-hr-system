var callAI;

async function callPuter(messages) {
  if (typeof puter === 'undefined') return { success: false, error: 'Puter not loaded' };
  try {
    var r = await puter.ai.chat(messages);
    var text = '';
    if (typeof r === 'string') text = r;
    else if (r && r.message && r.message.content) text = r.message.content;
    else if (r && r.text) text = r.text;
    else if (r && r.content) text = r.content;
    if (!text || !String(text).trim()) return { success: false, error: 'empty' };
    return { success: true, text: String(text).trim(), provider: 'puter' };
  } catch (e) { return { success: false, error: String(e.message || e) }; }
}

async function callOVH(messages) {
  try {
    var res = await fetch('https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-oss-120b', messages: messages, max_tokens: 600 })
    });
    if (!res.ok) return { success: false, error: 'HTTP_' + res.status };
    var d = await res.json();
    var text = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    if (!text) return { success: false, error: 'empty' };
    return { success: true, text: text.trim(), provider: 'ovh' };
  } catch (e) { return { success: false, error: String(e.message || e) }; }
}

async function callMetis(messages, key) {
  try {
    var res = await fetch('https://api.metisai.ir/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: messages, max_tokens: 600 })
    });
    if (!res.ok) return { success: false, error: 'HTTP_' + res.status };
    var d = await res.json();
    var text = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    if (!text) return { success: false, error: 'empty' };
    return { success: true, text: text.trim(), provider: 'metis' };
  } catch (e) { return { success: false, error: String(e.message || e) }; }
}

async function callAvalAI(messages, key) {
  try {
    var res = await fetch('https://api.avalai.ir/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: messages, max_tokens: 600 })
    });
    if (!res.ok) return { success: false, error: 'HTTP_' + res.status };
    var d = await res.json();
    var text = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    if (!text) return { success: false, error: 'empty' };
    return { success: true, text: text.trim(), provider: 'avalai' };
  } catch (e) { return { success: false, error: String(e.message || e) }; }
}

async function callPollinations(messages, options) {
  options = options || {};
  try {
    var res = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai',
        messages: messages,
        max_tokens: options.max_tokens || 800,
        temperature: options.temperature !== undefined ? options.temperature : 0.3
      })
    });
    if (res.ok) {
      var data = await res.json();
      var text = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
      if (text.trim()) return { success: true, text: text.trim(), provider: 'pollinations' };
    }
  } catch (e) { console.warn('Pollinations POST error:', e); }
  try {
    var userMsg = messages.filter(function(m) { return m.role === 'user'; }).map(function(m) { return m.content; }).join('\n');
    var sysMsg = messages.filter(function(m) { return m.role === 'system'; }).map(function(m) { return m.content; }).join('\n');
    var prompt = (sysMsg ? sysMsg + '\n\n' : '') + userMsg;
    var res2 = await fetch('https://text.pollinations.ai/' + encodeURIComponent(prompt));
    if (res2.ok) {
      var t = await res2.text();
      if (t && t.trim()) return { success: true, text: t.trim(), provider: 'pollinations-get' };
    }
  } catch (e) { console.warn('Pollinations GET error:', e); }
  return { success: false, error: 'pollinations-failed' };
}

callAI = async function(messages, options) {
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return { success: false, text: 'پیام خالی است.' };
  }
  if (options && options.system) {
    messages = [{ role: 'system', content: options.system }].concat(messages);
  }

  var pl = await callPollinations(messages, options);
  if (pl.success) return pl;

  var metisKey = localStorage.getItem('metis_api_key');
  var avalKey = localStorage.getItem('avalai_api_key');

  if (metisKey) {
    var m = await callMetis(messages, metisKey);
    if (m.success) return { success: true, text: m.text, provider: 'metis' };
  }
  if (avalKey) {
    var a = await callAvalAI(messages, avalKey);
    if (a.success) return { success: true, text: a.text, provider: 'avalai' };
  }
  var p = await callPuter(messages);
  if (p.success) return { success: true, text: p.text, provider: 'puter' };
  var o = await callOVH(messages);
  if (o.success) return { success: true, text: o.text, provider: 'ovh' };

  return { success: false, text: 'هیچ سرویس هوشی پاسخ نداد.' };
};

window.callAI = callAI;

window.setAIKey = function(provider, key) {
  if (provider === 'metis') localStorage.setItem('metis_api_key', key);
  else if (provider === 'avalai') localStorage.setItem('avalai_api_key', key);
  console.log('کلید ' + provider + ' ذخیره شد');
};

window.clearAIKeys = function() {
  localStorage.removeItem('metis_api_key');
  localStorage.removeItem('avalai_api_key');
  console.log('کلیدها پاک شدند');
};

console.log('✅ ai-connector.js — ۵ لایه (Pollinations, Puter, OVH, Metis, AvalAI)');