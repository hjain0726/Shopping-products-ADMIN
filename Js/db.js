const productOperations={
    addProduct(productObject){
        firebase.database().ref('products/'+productObject.pid).set(productObject);
        alert("product added");
    },
    searchAll(){
        var pr=new Promise((resolve,reject)=>{
            var prodref=firebase.database().ref('products');
            prodref.on('value',(snapshot)=>{
                var data=snapshot.val();
                resolve(data);
            });
        });
        return pr;
    },
    searchById(pid){
        var pro=new Promise((resolve,reject)=>{
            var prodref=firebase.database().ref('products/'+pid);
            prodref.on('value',(snapshot)=>{
                var object=snapshot.val();
                resolve(object);
            });
        });
        return pro;
    },
    deleteprod(pid){
        var prodref=firebase.database().ref('products/'+pid);
        prodref.remove();
    }
}