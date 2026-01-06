async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userText = input.value;
  chat.innerHTML += `<p><b>You:</b> ${userText}</p>`;
  input.value = "";

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  chat.innerHTML += `<p><b>TKC:</b> ${data.reply}</p>`;
}
