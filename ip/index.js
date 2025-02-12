//axios import buraya gelecek
import axios from 'axios'
var benimIP;
var DATA;
const cards = document.querySelector('.cards')


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek

function getApiDetails(MYIP) {
	return axios.get(`https://apis.ergineer.com/ipgeoapi/${MYIP}`)
		.then((res) => {
			// console.log('response',res.data)
			return res.data
		})
		.then(data => {
			DATA = data
		})
}


function geoCard(locData) {
	const cardDiv = document.createElement('div')
	cardDiv.classList.add('card')

	const img = document.createElement('img')
	img.setAttribute('src', locData['ülkebayrağı'])
	cardDiv.append(img)

	const infoDiv = document.createElement('div')
	infoDiv.classList.add('card-info')
	cardDiv.append(infoDiv)

	const ipHeader = document.createElement('h3')
	ipHeader.classList.add('ip')
	ipHeader.textContent = locData['sorgu']

	const ulke = document.createElement('p')
	ulke.classList.add('ulke')
	ulke.textContent = locData['ülke'] + ' ' + locData['ülkeKodu']

	const enlem = document.createElement('p')
	enlem.textContent = `Enlem: ${locData['enlem']} Boylam: ${locData['boylam']}`

	const sehir = document.createElement('p')
	sehir.textContent = `Şehir: ${locData['şehir']}`

	const saat = document.createElement('p')
	saat.textContent = `Saat dilimi: ${locData['saatdilimi']}`


	const para = document.createElement('p')
	para.textContent = `Para birimi: ${locData['parabirimi']}`

	const isp = document.createElement('p')
	isp.textContent = `ISP: ${locData['isp']}`

	infoDiv.append(ipHeader, ulke, enlem, sehir, saat, para, isp)

	return cardDiv
}

ipAdresimiAl()
	.then(() => {
		getApiDetails(benimIP)
			.then(() => {
				cards.append(geoCard(DATA))
			})
	})