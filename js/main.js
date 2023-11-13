const api = prompt(`Create API key : /https://platform.openai.com/api-keys/`);
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const images = document.querySelector(".images");

btn.onclick = () => {
    getImage();
};
async function getImage() {
    // make a request to openAi api
    const methods = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api}`,
        },
        body: JSON.stringify({
            prompt: input.value,
            n: 3,
            size: "256x256",
        }),
    };
    const res = await fetch("https://api.openai.com/v1/images/generations", methods);

    // parse the response as Json
    const data = await res.json();
    const listImages = data.data;
    images.innerHTML = "";
    listImages.map((photo) => {
        const container = document.createElement("div");
        const img = document.createElement("img");
        img.src = photo.url;
        container.appendChild(img);
        images.appendChild(container);
    });
}