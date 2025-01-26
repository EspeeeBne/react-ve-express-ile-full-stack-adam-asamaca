# Güvenlik Politikası

## Desteklenen Sürümler

| Sürüm   | Destek Durumu       |
| ------- | ------------------- |
| 1.0.0   | :white_check_mark:  |

**Not**: Yalnızca 1.0.0 ve üzeri sürümler CI/CD süreçleriyle desteklenmekte ve güvenlik yamaları almaktadır. Güvenliğiniz için en güncel sürümü kullanmanızı tavsiye ederiz.

---

## CI/CD Süreci ve Güvenlik

Versiyon 3.5.0 itibarıyla aşağıdaki CI/CD süreçleri otomatik olarak uygulanmaktadır:

1. **Frontend Build**:
   - Node.js 18 kullanılarak **frontend** bağımlılıkları yüklenir ve proje start edilir.
   - Bu süreç, kodun derlenebilir durumda olduğunu ve hatasız bir başlangıç sağladığını garanti eder.

2. **Backend Build**:
   - Node.js 18 kullanılarak **backend** bağımlılıkları yüklenir ve proje start edilir.
   - Bu süreç, kodun derlenebilir durumda olduğunu ve hatasız bir başlangıç sağladığını garanti eder.
  

   
CI/CD sürecinde yapılan bu kontroller, hem frontend hem de backend kodlarının minimum hata ile dağıtılmasını sağlar.

---

## Güvenlik Açığı Bildirimi

Projede bir güvenlik açığı tespit ettiyseniz, lütfen aşağıdaki adımları izleyin:

1. **İletişim**: Güvenlik açığını [espeebne@proton.me](mailto:espeebne@proton.me) adresine e-posta yoluyla bildirin.
2. **E-posta Konusu**: E-posta konusunda "Güvenlik Açığı Bildirimi" ifadesini kullanın.
3. **Detaylar**:
   - Güvenlik açığının ayrıntılı bir açıklamasını ekleyin.
   - Sorunun tekrarlanabilmesi için adım adım talimatlar verin.
   - Varsa, önerilen çözüm veya düzeltmeleri paylaşın.

---

## Yanıt Süreci

Güvenlik açığı bildiriminizi aldıktan sonra aşağıdaki süreci takip edeceğiz:

1. **Onaylama**: Bildiriminizi aldığımızı 24 saat içinde onaylayacağız.
2. **Araştırma**: Sorunu inceleyecek ve gerekli testleri yapacağız.
3. **Düzeltme**: Güvenlik açığı doğrulanırsa, bir yama yayınlayacak ve sizi bilgilendireceğiz.
4. **Teşekkür**: Güvenlik katkınızın bir parçası olarak, talebiniz doğrultusunda adınız proje sürüm notlarında belirtilebilir.

---

## Öneriler ve İletişim

Güvenlik politikamız hakkında önerileriniz varsa veya detaylı bilgi almak isterseniz, bizimle [espeebne@proton.me](mailto:espeebne@proton.me) üzerinden iletişime geçebilirsiniz.
