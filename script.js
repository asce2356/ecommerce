plp();
function plp(){

    $.ajax({
        url: "https://dummyjson.com/products",
        type: 'GET',
        success: function(res) {
            console.log(res);
            console.log(res.products);
            console.log(res.products[0]);
            var htmlStr=`<div class='row'>`
            // debugger;
            for (let i = 0; i < res.products.length; i++) {
                // const product = res.products[i];
                htmlStr += `
                    <div class='col-sm-4 col-xs-12 prodSec' id='${res.products[i].id}'>
                        <img class="img-fluid imgCust" src='${res.products[i].thumbnail}'>
                        <h6>${res.products[i].brand}</h6>
                        <h4>${res.products[i].title}</h4>
                        <p>Price : ${res.products[i].price} </p>
                        <p>Ratings : ${res.products[i].rating} </p>
                        
                    </div>
                `
            }
            htmlStr += `</div>`
            $("#content").html(htmlStr);
            pdp();
        }
    });
    }  
           

       
        
    
function pdp(){
    $(".prodSec").click(function(){
        var id=$(this).attr('id');
        // alert(id);
        $.ajax({
            url: "https://dummyjson.com/products/"+id,
            type: 'GET',
            success: function(res1) {
                console.log(res1);
                // alert(JSON.stringify(id));
                $("#content").html("");
                var html1=`
                <div class='row'><br></div>
                <div class='col-sm-4'><button id='bckBtn' class='btn btn-primary'>BACK</button>
                </div>`
                // $("#content").html(html1);
              
                html1 += 
                `<div class='row'>
                    <div class='col-sm-5 col-xs-12 prodImgMain'>
                        <img src='${res1.images[0]}' id='prodImgMainId'>
                        <div class='row'>
                `
                var strpImg = res1.images;
                for (let i = 0; i < strpImg.length; i++) {
                    console.log(strpImg[i]);
                    html1 += 
                    `<div class="col">
                        <img src='${strpImg[i]}' class='img-fluid prodImgClass'>
                    </div>`                            
                }
                html1 += 
                `       </div>
                    </div>
                    <div class='col-sm-7 col-xs-12'>
                    <h2>Product Details:</h2>
                    <hr>
                    <h6>Brand: ${res1.brand}</h6>
                    <h6>Ratings: ${res1.rating}</h6>
                    <h4>Price: Rs.${res1.rating}</h4>
                    <h6 class='stkAltr'>Only ${res1.stock} units left in stock</h6>
                    <h6 class='pDesc'>Description: ${res1.description} ${res1.description} ${res1.description} ${res1.description} ${res1.description}</h6>
                    <button href="#" class="addToCartBtn btn btn-warning btn-lg">ADD TO CART</button>
                    </div>
                </div>`
                
                $("#content").html(html1);
                $("#bckBtn").click(function(){
                    plp();
                });
                $('.prodImgClass').hover(function(){
                    var hoveredSrc=$(this).attr("src");
                    $('#prodImgMainId').attr("src", hoveredSrc) ;
                });    
            }
       });
    });

}

$("#prodSearch").click(function(){
    var searchKey=$("#srchTerm").val();
    // alert('id found');
    $.ajax({
        url: "https://dummyjson.com/products/search?q="+searchKey,
        type: 'GET',
        success: function(res1) {
            console.log(res1.products);
            var srchProdList=res1.products;
            $("#content").html("");
            var html2 =
                    `
                    <div class='row'><br></div>
                    <div class='col-sm-4'>
                        <button id='bckBtn' class='btn btn-primary'>BACK</button>
                    </div>
                    <div class='row'>`

            for (let i = 0; i < srchProdList.length; i++) {
                const element = srchProdList[i];
                html2 +=`
                    <div class='col-sm-4 col-xs-12 prodSec' id='${srchProdList[i].id}'>
                        <img class="img-fluid imgCust" src='${srchProdList[i].thumbnail}'>
                        <h6>${srchProdList[i].brand}</h6>
                        <h4>${srchProdList[i].title}</h4>
                        <p>Price : ${srchProdList[i].price} </p>
                        <p>Ratings : ${srchProdList[i].rating} </p>
                        
                    </div>
                `           
            }
            html2+=`</div>`

            $("#content").html(html2);
            $("#bckBtn").click(function(){
                plp();
            });
            pdp();

        }   
    });
}); 
$("form").submit(function(e){
    e.preventDefault();
});


