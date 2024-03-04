document.addEventListener('DOMContentLoaded', function() { //evento dom é pra que esse codigo seja executado apos todos os arquivos css html etc forem carregados
  document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
    evento.preventDefault(); //ele vai previnir o comportamento padrão do form
    let numeroMaximo = document.getElementById('numero-maximo').value;
    numeroMaximo = parseInt(numeroMaximo); //convertendo o valor para inteiro
    
    let numeroAleatorio = Math.random() * numeroMaximo; //math randon vai sortear um numero
    numeroAleatorio = Math.floor(numeroAleatorio + 1); //função que arrendoda

    document.getElementById('resultado-valor').innerText = numeroAleatorio;
    document.querySelector('.resultado').style.display = 'block'; //aqui vai fazer sumir a msg e aparecer so quando clicar no button
  })
})


//math.ceil vai arredondar um numero pra cima e math.floor arredonda pra baixo e math.round e arredonda mais certo mas se somar + 1 o resultado ficara maior que o numero max, dai teremos que usar o floor

