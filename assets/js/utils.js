function convertUpperCase(publicacao){
    return publicacao[0].toUpperCase() + publicacao.substring(1);
}

function generateOrder(order){
    return '#' + ("000" + order).slice(-3)

}