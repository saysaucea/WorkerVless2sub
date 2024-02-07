addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 获取请求的路径
  const url = new URL(request.url);
  const path = url.pathname.substring(1); // 去掉开头的斜杠

  // 根据路径确定 txt 的值
  const txt = path || 'addressesapi.txt';

  // 构建 GitHub Raw 文件的 URL
  const githubRawUrl = `https://raw.githubusercontent.com/cmliu/api-sub2CC/main/${txt}`;

  // 替换为您的 GitHub Token
  const githubToken = 'ghp_xxxxxxxxxxxxxxxxxxx';

  // 构建请求头
  const headers = new Headers();
  headers.append('Authorization', `token ${githubToken}`);

  // 发起请求
  const response = await fetch(githubRawUrl, { headers });

  // 检查请求是否成功 (状态码 200 到 299)
  if (response.ok) {
    // 读取文件内容
    const content = await response.text();

    // 在这里您可以处理文件内容，例如返回给客户端或进行其他操作
    return new Response(content, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  } else {
    // 如果请求不成功，返回适当的错误响应
    return new Response('Failed to fetch file', { status: response.status });
  }
}
