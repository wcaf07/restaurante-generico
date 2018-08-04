// Por padrão o nome das imagens que vão ser usadas no app terão os mesmos nomes que as que compoe a pasta images, devido a impossibilidade do react carregar imagens dinamicamente
var config = {
  businessId : "000001", //id do restaurante ao qual o app vai baixar informações
  businessName : "Genérico", // nome do restaurante
  primaryColor : "#F44336", // cor principal do app
  secondayColor : "#ffffb3", // cor secundaria do app
  backgroundColor : "#ffffff", // cor background do app
  facebookUrl : "https://www.facebook.com/", // url redirecionamento facebook home
  instagramUrl : "https://www.instagram.com/?hl=pt-br", // url redirecionamento instagram home
  mapsUrl: "https://www.google.com.br/maps/place/Shopping+RioMar+Recife/@-8.085795,-34.895161,15z/data=!4m5!3m4!1s0x0:0x8703d695d5d12f94!8m2!3d-8.085795!4d-34.895161", // url maps da home
  workingDays: "Quarta a Domingo", // info home
  workingHours: "das 18:30 às 00:30", // info home
  titleBgMenuColor: "#f2f3f3", // cor de fundo da sessão do menu ex: Bebidas, Entrada e etc
  reviewTitleBgColor: "#f4f4f4", // cor de fundo do titulo da tela de review do pedido ex: Descricao produtos, endereco forma de pagamento
  mapsColor: "#8BC34A",
  currentScreen : "Login", // tela atual para guiar o back do android
  backLightColor : "#F5F4F4",
  textLightColor : "#f4f4f4",
  textDarkColor : "#767676", // textos escuro da aplicaçao
  lightColor : "#FFC400",
  hlColor: "#00C853",
  titleLightColor : "#ffffff",
  titleDarkColor: "#4C4A48",
  homeCardColor: "transparent"
}

module.exports = config
