const endPoint = "http://127.0.0.1:8000/api/articles/"
const endPoint2 = "http://127.0.0.1:8000/api/subarticles/"

$(document).ready(function () {
    $("#alerta").hide()
    $("#alerta2").hide()
    initList()
    initList2()
    $("#crear").click(function () {
        createArticle()
    })

    $("#crearSubArt").click(function () {
        createSubArt()
    })

    $("#updt").click(function () {
        updtArticle()
    })

    $("#updt2").click(function () {
        updtSubArticle()
    })
});

function initList() {
    var page = 0,
        limit = 10,
        total = 0;

    fetchData();

    $(".prev-btn").on("click", function () {
        if (page > 0) {
            page--;
            fetchData();
        }
    });

    $(".next-btn").on("click", function () {
        if (page * limit < total) {
            page++;
            fetchData();
        }
    });

    function fetchData() {
        $.ajax({
            method: "GET",
            url: endPoint + 'getAll',
            data: {
                page: page,
                limit: limit
            },
            success: function (data) {
                var articles = data;

                console.log(articles);

                total = data.total;

                var html = "";

                if (articles.length > 0) {
                    for (i = 0; i < articles.length; i++) {
                        html += "<tr >" +
                            "<td>" + articles[i].art_id + "</td>" +
                            "<td>" + articles[i].art_desc + "</td>" +
                            "<td>" + articles[i].art_price + "</td>" +
                            "<td>" + articles[i].art_qty + "</td>" +
                            "<td>" + articles[i].created_at + "</td>" +
                            "<td>" + articles[i].updated_at + "</td>" +
                            "<td><button class='btn btn-warning btn-sm' data-bs-toggle='modal' data-bs-target='#updtModal' onclick=updtModal('" + articles[i].art_id + "','" + encodeURIComponent(articles[i].art_desc) + "','" + articles[i].art_price + "','" + articles[i].art_qty + "')>Actualizar</button></td>" +
                            "<td><button class='btn btn-danger btn-sm' onclick=deleteArticle('" + articles[i].art_id + "')>Eliminar" +
                            "</button></td>" +
                            + "</tr>"
                    }
                } else {
                    html += "<h3>No hay registros para mostrar</h3>"
                }
                $("#arttb").html(html);
            },
            error: function () {
            }
        });
    }
}

function initList2() {
    var page = 0,
        limit = 10,
        total = 0;

    fetchData();

    $(".prev-btn2").on("click", function () {
        if (page > 0) {
            page--;
            fetchData();
        }
    });

    $(".next-btn2").on("click", function () {
        if (page * limit < total) {
            page++;
            fetchData();
        }
    });

    function fetchData() {
        $.ajax({
            method: "GET",
            url: endPoint2 + 'getAll',
            data: {
                page: page,
                limit: limit
            },
            success: function (data) {
                var articles = data;

                console.log(articles);

                total = data.total;

                var html = "";

                if (articles.length > 0) {
                    for (i = 0; i < articles.length; i++) {
                        html += "<tr >" +
                            "<td>" + articles[i].subart_id + "</td>" +
                            "<td>" + articles[i].subart_desc + "</td>" +
                            "<td>" + articles[i].art_desc + "</td>" +
                            "<td>" + articles[i].created_at + "</td>" +
                            "<td>" + articles[i].updated_at + "</td>" +
                            "<td><button class='btn btn-warning btn-sm' data-bs-toggle='modal' data-bs-target='#updtModal2' onclick=updtModal2('" + articles[i].subart_id + "','" + encodeURIComponent(articles[i].subart_desc) + "','" + articles[i].art_id + "')>Actualizar</button></td>" +
                            "<td><button class='btn btn-danger btn-sm' onclick=deleteSubArt('" + articles[i].subart_id + "')>Eliminar" +
                            "</button></td>" +
                            + "</tr>"
                    }
                } else {
                    html += "<h3>No hay registros para mostrar</h3>"
                }
                $("#subarttb").html(html);
            },
            error: function () {
            }
        });
    }
}

function createArticle() {
    let article = {
        art_desc: $("#art_desc").val(),
        art_price: $("#art_price").val(),
        art_qty: $("#art_qty").val(),
    }

    console.log(article);

    $.ajax({
        type: "POST",
        url: endPoint + 'create',
        data: JSON.stringify(article),
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            let mensaje = ""
            mensaje = "articulo creado correctamente"
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            clean()
            window.location.reload()
        },
        error: function () {
            mensaje = "problemas al crear en BD consulte con el Administrador"
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            clean()
        }
    })
}

function updtModal(art_id, art_desc, art_price, art_qty){
    console.log(art_id, decodeURIComponent(art_desc), art_price, art_qty)
    $("#art_id_updt").val(art_id)
    $("#art_desc_updt").val(decodeURIComponent(art_desc))
    $("#art_price_updt").val(art_price)
    $("#art_qty_updt").val(art_qty)
}

function updtArticle(){
    let article = {
        art_desc: $("#art_desc_updt").val(),
        art_price: $("#art_price_updt").val(),
        art_qty: $("#art_qty_updt").val(),
    }

    let art_id = $("#art_id_updt").val()

    console.log(article, art_id)

    $.ajax({
        url: endPoint + "update/" + art_id,
        method: 'PUT',
        data: JSON.stringify(article),
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {
            let mensaje = ""
            mensaje = "Artículo actualizado correctamente"
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            initList()
            cleanUpdt()
        },
        error: function(){
            mensaje = "problemas al crear en BD consulte con el Administrador"
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            cleanUpdt()
        }
    })
}

function cleanUpdt() {
    $("#art_desc_updt").val("")
    $("#art_price_updt").val("")
    $("#art_qty_updt").val("")
    $("#updtModal").modal('hide')
}

function updtModal2(subart_id, subart_desc, subart_art_id){
    console.log(subart_id, decodeURIComponent(subart_desc), subart_art_id)
    getDataUpdt(subart_art_id)
    $("#subart_id_updt").val(subart_id)
    $("#subart_desc_updt").val(decodeURIComponent(subart_desc))
    $("#subart_art_id_updt").val(subart_art_id)
}

function updtSubArticle(){
    let article = {
        subart_desc: $("#subart_desc_updt").val(),
        subart_art_id: parseInt($("#mainArticleUpdt").val()),
    }

    let subart_id = $("#subart_id_updt").val()

    console.log(article, subart_id)

    $.ajax({
        url: endPoint2 + "update/" + subart_id,
        method: 'PUT',
        data: JSON.stringify(article),
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {
            let mensaje = ""
            mensaje = "Artículo actualizado correctamente"
            $("#alerta2").show()
            $("#mensaje2").html(mensaje)
            initList()
            cleanUpdt()
        },
        error: function(){
            mensaje = "problemas al crear en BD consulte con el Administrador"
            $("#alerta2").show()
            $("#mensaje2").html(mensaje)
            cleanUpdt2()
        }
    })
}


function cleanUpdt2() {
    $("#subart_desc_updt").val("")
    $("#updtModal2").modal('hide')
}

function getData() {
    $.ajax({
        method: "GET",
        url: endPoint + 'getAll',
        success: function (data) {
            var articles = data;

            console.log(articles);

            total = data.total;

            var html = "";

            if (articles.length > 0) {
                for (i = 0; i < articles.length; i++) {
                    html += "<option value=" + articles[i].art_id + ">" + articles[i].art_desc + "</option>"
                }
            } else {
                html += "<h3>No hay registros para mostrar</h3>"
            }
            $("#mainArticle").html(html);
        },
        error: function () {
        }
    })
}

function getDataUpdt() {
    $.ajax({
        method: "GET",
        url: endPoint + 'getAll',
        success: function (data) {
            var articles = data;

            console.log(articles);

            total = data.total;

            var html = "";

            if (articles.length > 0) {
                for (i = 0; i < articles.length; i++) {
                    html += "<option value=" + articles[i].art_id  + ">" + articles[i].art_desc + "</option>"
                }
            } else {
                html += "<h3>No hay registros para mostrar</h3>"
            }
            $("#mainArticleUpdt").html(html);
        },
        error: function () {
        }
    })
}

function createSubArt() {
    let subarticle = {
        subart_desc: $("#subart_desc").val(),
        subart_art_id: $("#mainArticle").val(),
    }

    console.log(subarticle);

    $.ajax({
        type: "POST",
        url: endPoint2 + 'create',
        data: JSON.stringify(subarticle),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {
            console.log(data);
            let mensaje = ""
            if (data != null) {
                mensaje = "articulo creado correctamente"
            }
            if (data.error != null) {
                mensaje = "problemas al crear en BD consulte con el Administrador"
            }
            $("#alerta2").show()
            $("#mensaje2").html(mensaje)
            clean2()
            window.location.reload()
        }
    })
}

function clean() {
    $("#art_desc").val("")
    $("#art_price").val("")
    $("#art_qty").val("")
    $("#exampleModal").modal('hide')
}

function clean2(){
    $("#subart_desc").val("")
}

function deleteArticle(id){
    console.log(id)
    $.ajax({
        method: "DELETE",
        url: endPoint + 'delete/' + id,
        complete: function(id){
            if(id != null){
                let mensaje = "Artículo eliminado correctamente"
                $("#alerta").show()
                $("#mensaje").html(mensaje)
                initList()
            }else{
                let mensaje = "Ocurrió un error..."
                $("#alerta").show()
                $("#mensaje").html(mensaje)
            }
        }
    })
}

function deleteSubArt(id){
    console.log(id)
    $.ajax({
        method: "DELETE",
        url: endPoint2 + 'delete/' + id,
        complete: function(id){
            if(id != null){
                let mensaje = "sub artículo eliminado correctamente"
                $("#alerta2").show()
                $("#mensaje2").html(mensaje)
                initList()
            }else{
                let mensaje = "Ocurrió un error..."
                $("#alerta2").show()
                $("#mensaje2").html(mensaje)
            }
        }
    })
}