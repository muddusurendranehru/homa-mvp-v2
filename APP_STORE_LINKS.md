# 📱 App Store Links - HOMA Clinic

## 🎯 Google Play Store

### **App URL:**
```
https://play.google.com/store/apps/details?id=com.homaclinic.app&utm_source=whatsapp&utm_medium=staff_message&utm_campaign=app_launch
```

### **Short URL (without UTM):**
```
https://play.google.com/store/apps/details?id=com.homaclinic.app
```

### **App ID:**
```
com.homaclinic.app
```

---

## 📊 UTM Parameters Breakdown

The full URL includes tracking parameters:
- `utm_source=whatsapp` - Traffic source
- `utm_medium=staff_message` - Medium type
- `utm_campaign=app_launch` - Campaign name

---

## 🔗 Usage in Code

### **In Manifest.json:**
Already added to `web/public/manifest.json`:
```json
"related_applications": [
  {
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=com.homaclinic.app",
    "id": "com.homaclinic.app"
  }
],
"prefer_related_applications": false
```

### **In HTML/React:**
```jsx
<a 
  href="https://play.google.com/store/apps/details?id=com.homaclinic.app&utm_source=whatsapp&utm_medium=staff_message&utm_campaign=app_launch"
  target="_blank"
  rel="noopener noreferrer"
>
  Download on Google Play
</a>
```

### **Badge Image:**
Use Google Play badge:
```
https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png
```

---

## 📝 Notes

- ✅ App ID matches manifest.json: `com.homaclinic.app`
- ✅ Link added to manifest as related application
- ✅ `prefer_related_applications: false` means PWA is preferred, but Play Store app is available
- ✅ UTM parameters help track app installs from WhatsApp staff messages

---

## 🎯 Next Steps

1. Add Play Store download button to website footer
2. Add to homepage CTA section
3. Include in email signatures
4. Share on social media with tracking links
