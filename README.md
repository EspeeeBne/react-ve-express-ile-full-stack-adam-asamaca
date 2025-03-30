# Adam Asıyoruz

Adam Asıyoruz, bir adam asmaca oyunudur. Bu proje Express.js tabanlı bir back-end ve React.js tabanlı bir front-end içerir. Oyun, MongoDB kullanılarak veri yönetimi sağlar ve hem iki kişilik oyun modunu hem de yapay zeka ile oynama seçeneğini destekler.

---

## Özellikler

- **Tek ve iki kişilik mod**: Yapay zeka ile veya arkadaşınızla oynayabilirsiniz.
- **Tema seçimi**: MUI Theming kullanılarak siyah ve beyaz tema arasında geçiş yapılabilir.
- **Responsive tasarım**: Tüm cihazlarla uyumlu.
- **Dil desteği**: Türkçe ve İngilizce için i18n kullanımı.
- **Fallback ve Skeleton**: Yükleme sırasında kullanıcı deneyimini artırır.

---

## Gereksinimler

- **Node.js** (LTS sürümü ilk defa kuracaksınız daha iyi olur) [Node.js İndirme Sayfası](https://nodejs.org/)
- **MongoDB** [MongoDB İndirme Sayfası](https://www.mongodb.com/try/download/community)
- **Git** [Git İndirme Sayfası](https://git-scm.com/)

---

## Kurulum

### Adım 1: Depoyu Klonlayın

```
git clone https://github.com/EspeeeBne/react-ve-express-ile-full-stack-adam-asamaca.git
cd adam-asiyoruz
```

### Adım 2: Ortam Dosyalarını Ayarlayın

Hem back-end hem de front-end için birer `.env` dosyası oluşturun. İlgili örnek dosyaları şu şekilde kopyalayabilirsiniz:

```
cp back-end/.env.example back-end/.env
cp front-end/.env.example front-end/.env
```

`back-end/.env` dosyasında MongoDB bağlantı URL'sini ayarlayın:

```
MONGO_URI=mongodb://127.0.0.1:27017/adamAsiyoruz
```

### Adım 3: MongoDB Veritabanını Oluşturun

MongoDB'de `adamAsiyoruz` adında bir veritabanı oluşturun:

```
mongosh üzerinden
use adamAsiyoruz
```

### Adım 4: Bağımlılıkları Yükleyin

Hem back-end hem de front-end dizinlerinde bağımlılıkları yükleyin:

```
cd back-end
npm install --legacy-peer-deps
cd ../front-end
npm install --legacy-peer-deps
```

### Adım 5: Veritabanını Başlatın

Back-end dizininde aşağıdaki komutla veritabanını aktarın:

```
npm run dbaktar
```

Bu komut, MongoDB'ye gerekli verileri otomatik olarak aktaracaktır.

### Adım 6: Uygulamayı Başlatın (Opsiyonel adım 7'yi yapmanızı tavsiye ederim ama bütün yapıyı start ile test etmiş olsam da build için ayarladım her şeyi)

Eğer adım 6'yı kullanıp açacaksanız hem back-end hem front-end'in .env içinde bulunan "NODE_ENV" değerini development diye ayarlamalısınız axios çalışmaz yoksa.

Back-end ve front-end'i ayrı terminallerde çalıştırın:

#### Back-end:

```
cd back-end
npm start
```

#### Front-end:

```
cd front-end
npm start
```

### Adım 7: Production Build (Opsiyonel iki türlü de çalışıyor)

Eğer adım 7'yi kullanıp açacaksanız hem back-end hem front-end'in .env içinde bulunan "NODE_ENV" değerini production diye ayarlamalısınız axios çalışmaz yoksa.


Front-end için production build alın ve back-end'e aktarın:

```
cd front-end
npm run build
cp -r build/* ../back-end/public/
```

Ardından sadece back-end sunucusunu başlatabilirsiniz:

```
cd back-end
npm start
```

---

## Kullanılan Teknolojiler

- **Back-end**: Node.js, Express.js, MongoDB, Artık kullanmayı daha çok sevdiğim canımın içi cors
- **Front-end**: React.js, MUI, i18n, Axios, Framer Motion, react-router

---

## Lisans

Bu proje **MIT** lisansı ile lisanslanmıştır. Daha fazla bilgi için [LİSANS](./LICENSE) dosyasını inceleyebilirsiniz.
