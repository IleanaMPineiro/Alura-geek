async function submitForm(e) {
  if (e.preventDefault) e.preventDefault();
  const formHTML = document.getElementById("form");
  const formData = new FormData(formHTML);
  const name = formData.get("name");
  const price = formData.get("price");
  const image = formData.get("image");
  console.log({ name, price, image });
  const id = new Date().getTime();
  let div = document.createElement("div");
  const imageBase64 = await toBase64(image);

  const element = document.createElement("div");
  element.innerHTML = `
    <div class="product-card" id=${id}>
        <img src=${imageBase64} class="product-image" />
        <h4 class="product-title">${name}</h4>
        <div class="product-description">
            <h4 class="product-price">$ ${price}</h4>
            <div class="product-delete" onclick="deleteItem(${id})"> <i class="bi bi-trash3"></i> </div>
        </div>
    </div>
  `;
  const productsHTML = document.getElementById("products-body");
  productsHTML.appendChild(element);

  formHTML.reset();
}
function deleteItem(id) {
  const itemHTML = document.getElementById(id);
  itemHTML.remove();
}
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
var form = document.getElementById("form");
if (form.attachEvent) {
  form.attachEvent("submit", submitForm);
} else {
  form.addEventListener("submit", submitForm);
}
