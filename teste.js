async function teste() {
  try {
    const formData = new URLSearchParams();
    formData.append("username", "caua1");
    formData.append("password", "caua1");

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    if (response.ok) {
      alert("Response Sucessful");
      console.log(await response.text());
    } else {
      alert("Erro: " + response.statusText);
    }
  } catch (e) {
    console.log(e);
  }
}
