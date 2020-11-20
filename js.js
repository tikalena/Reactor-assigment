
//Get list API//
async function getList(product) {

//at the end of the url add the name of the needed product
  let url = `https://bad-api-assignment.reaktor.com/products/${product}`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

//Availability by manufacturer using product's ID//
async function availability(manufacture) {
  let manufacturerUrl = `https://bad-api-assignment.reaktor.com/availability/${manufacture}`;
  try {
    let res = await fetch(manufacturerUrl);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

//GET Availability by ID//
async function getAvailabilityById (manufacturer, productId) {

//Open modal dialog
  $('.ui.mini.modal')
  .modal('show')
  ;

//Wait response from API
  let manufacturerList = await availability(manufacturer);

//Find by productID from manufacture list
  let result = manufacturerList.response.find(item => item.id == productId.toUpperCase());

//Set inside Modal dialog result of availability
  let modalAvailability = `<div> 
                           <p>${result.DATAPAYLOAD}</p>                 
                        </div>`;

  let modalWindow  = document.querySelector('.modal.content');
  modalWindow.innerHTML = modalAvailability;

}

async function renderList(product) {

//Spinner ON
  document.getElementById("spinner").style.display = "block";

//Fetch needed list from API
  let products = await getList(product);
  let html = '';
  for (const product of products) {
    let htmlSegment = `<div class="list"> 
                            <table id="table" class="ui definition table attached segment" style="width: 90%; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1)" >
                                <tr>
                                    <tr>
                                        <td rowspan="3" style="width: 50%">${product.name}</td>
                                        <td>Price ${product.price} €</td>
                                    </tr>
                                <tr>
                                    <td class="rowspanned"></td>
                                    <td>Color: ${product.color} </td> 
                                </tr>
                                <tr>
                                    <td class="rowspanned"></td>
                                    <td>Manufacturer: ${product.manufacturer}</td>    
                                </tr>                          
                            </tbody>

                          </table> 
                          <div class="availability">
                          <button class="ui bottom attached primary button" id="loadingButton" tabindex="0" onclick="getAvailabilityById('${product.manufacturer}', '${product.id}')">Check Availability </button>
                          </div>
                        </div>`;

    html += htmlSegment;
  }

  let categoryHeader = document.querySelector('#categoryHeader');
  categoryHeader.innerHTML = product;

  let container = document.querySelector('.list');
  container.innerHTML = html;

//Spinner none
  document.getElementById("spinner").style.display = "none";
}




