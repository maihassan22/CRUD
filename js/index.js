var Regex = /^[A-Z][a-zA-Z]{3,6}$/;
var productNameInp = document.getElementById("productNameInp");
var productPriceInp = document.getElementById("productPriceInp");
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");
var addBtn=document.getElementById("addBtn");
var productsList ;
var currentIndex=0;

addBtn.addEventListener("click" ,function()
{
    if(addBtn.innerHTML=="add product")
    {
        addProduct();
    }
    else
    {
        saveUpdate();
    }
})

function saveUpdate()
{
    if(validateProductName() == true)
    {
     var product =
     {
         name: productNameInp.value,
         price: productPriceInp.value,
         category: productCategoryInp.value,
         desc: productDescInp.value,
     }
     productsList[currentIndex]=product;
     localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
     displayProducts();
     clearForm();
    }
    addBtn.innerHTML="add product"

}


function validateProductName()
{
    if(  Regex.test(productNameInp.value) == false)
    {
      productNameInp.classList.add("is-invalid");
      productNameInp.classList.remove("is-valid");

      return false;
    }
    else
    {
      productNameInp.classList.add("is-valid");
      productNameInp.classList.remove("is-invalid");

      return true;

    } 
}
productNameInp.addEventListener("keyup" , validateProductName)

if(localStorage.getItem("myProducts") == null )
{
    productsList = [];
}
else
{
    productsList = JSON.parse( localStorage.getItem("myProducts") );
    displayProducts();
    
}
function addProduct()
{

    if(validateProductName() == true)
    {
     var product =
     {
         name: productNameInp.value,
         price: productPriceInp.value,
         category: productCategoryInp.value,
         desc: productDescInp.value,
     }
     productsList.push(product);
     localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
     displayProducts();
     clearForm();
    }
}

function displayProducts() {
    var cont = ``;
    for (var i = 0; i < productsList.length; i++) {
        cont += `<tr>
            <td>`+i+`</td>
            <td>` + productsList[i].name + `</td>
            <td>`+ productsList[i].price + `</td>
            <td>`+ productsList[i].category + `</td>
            <td>`+ productsList[i].desc + `</td>
            <td><button onclick="updateProduct(`+i+`)" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button></td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cont;
}


function searchProducts(term)
{
    var cartoona = ``;
        for(var i= 0 ; i < productsList.length ;i++)
        {
            if(productsList[i].name.includes(term) == true )
            {
                    cartoona +=`<tr>
                    <td>`+i+`</td>
                    <td>` + productsList[i].name + `</td>
                    <td>`+ productsList[i].price + `</td>
                    <td>`+ productsList[i].category + `</td>
                    <td>`+ productsList[i].desc + `</td>
                    <td><button onclick="updateProduct(`+i+`)" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button></td>
                   
                  </tr>`
            }
        }
        document.getElementById("tableBody").innerHTML = cartoona;
}


function deleteProduct(index)
{
    productsList.splice(index , 1);
    localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
    displayProducts();
}
function updateProduct(index)
{
    currentIndex=index;
    productNameInp.value =productsList[index].name;
    productPriceInp.value =productsList[index].price;
    productCategoryInp.value = productsList[index].category;
    productDescInp.value = productsList[index].desc;
    addBtn.innerHTML="Update";
    
}

function clearForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productCategoryInp.value = "";
    productDescInp.value = "";
    
}
