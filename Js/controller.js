window.addEventListener("DOMContentLoaded",init);

 function init(){
     document.querySelector("#add").addEventListener("click",add);
     document.querySelector("#showall").addEventListener("click",display);
     document.querySelector("#search").addEventListener("click",search);
}

// function for search by id
function search(){
    var pid=document.querySelector("#searchtxt").value;
    var pro=productOperations.searchById(pid);
    pro.then(obj=>{
        document.querySelector("#product").innerHTML="";
        var div =document.createElement("div");
            var button=document.createElement("button");
            div.className="alert alert-info";

            button.className="btn btn-success float-right";
            button.innerHTML="Delete";
            button.setAttribute("productid",obj.pid);
            button.addEventListener('click',productDel);
            
            var updatebtn=document.createElement("button");
            updatebtn.className="btn btn-secondary float-right margin-right";
            updatebtn.innerHTML="Update";
            updatebtn.setAttribute("prodid",obj.pid);
            updatebtn.addEventListener('click',update);

            document.querySelector("#product").appendChild(div);
            div.appendChild(button);
            div.appendChild(updatebtn);

        for(let key in obj){
            if(key=="pid"){
               
                var p1=document.createElement("p");
                div.appendChild(p1);
                p1.innerHTML="Id : "+obj[key];
            }
            else if(key=="name"){
                var p2=document.createElement("p");
                div.appendChild(p2);
                p2.innerHTML="Product-Name : "+obj[key];
            }
            else if(key=="price"){
                var p3=document.createElement("p");
                div.appendChild(p3);
                p3.innerHTML="Price : "+obj[key]+" ₹";
            }
            else if(key=="url"){
                var img=document.createElement("img");
                    img.src=obj[key];
                    div.appendChild(img);
                }
        }
    }).catch(err=>console.log(err));
}


// function for adding product
 function add(){
    var pid=document.querySelector("#pid").value; 
    var name=document.querySelector("#name").value;
    var price=document.querySelector("#price").value;
    var url=document.querySelector("#url").value;

    var productObject=new Product(pid,name,price,url);
    productOperations.addProduct(productObject);

    document.querySelector("#pid").value="";
    document.querySelector("#name").value="";
    document.querySelector("#price").value="";
    document.querySelector("#url").value="";
    display();   
 }


 //function for displaying all added products
 function display(){
     var counter =0;
    var pr=productOperations.searchAll();
    pr.then(data=>{
        document.querySelector("#product").innerHTML="";
        var h6=document.createElement("h6");
        document.querySelector("#product").appendChild(h6);
        for(let key in data){
            counter++;
            var obj=data[key];
            var div =document.createElement("div");
            var button=document.createElement("button");
            div.className="alert alert-info";

            button.className="btn btn-success float-right";
            button.innerHTML="Delete";

            button.setAttribute("productid",key);
            button.addEventListener('click',productDelete);

            var updatebtn=document.createElement("button");
            updatebtn.className="btn btn-secondary float-right margin-right";
            updatebtn.innerHTML="Update";
            updatebtn.setAttribute("prodid",key);
            updatebtn.addEventListener('click',update);


            document.querySelector("#product").appendChild(div);
            div.appendChild(button);
            div.appendChild(updatebtn);
            for(let key in obj){
                if(key=="pid"){
                    var p1=document.createElement("p");
                    div.appendChild(p1);
                    p1.innerHTML="Id : "+obj[key];
                }
                else if(key=="name"){
                    var p2=document.createElement("p");
                    div.appendChild(p2);
                    p2.innerHTML="Product-Name : "+obj[key];
                }
                else if(key=="price"){
                    var p3=document.createElement("p");
                    div.appendChild(p3);
                    p3.innerHTML="Price : "+obj[key]+" ₹";
                }
                else if(key=="url"){
                    var img=document.createElement("img");
                    img.src=obj[key];
                    div.appendChild(img);
                }
                
            }
            
        }
        h6.innerHTML="Total no of products : "+counter;
    }).catch(err=>console.log(err));
    
 }

 // delete function for button inside display function 
 function productDelete(){
     var id=this.getAttribute("productid");
    productOperations.deleteprod(id);
    display();
 }

 //delete function for button inside search function
 function productDel(){
    var id=this.getAttribute("productid");
   productOperations.deleteprod(id);
   document.querySelector("#product").innerHTML="";
}

//function for updating record
function update(){
    var id=this.getAttribute("prodid");
    document.querySelector("#pid").value=id;
}