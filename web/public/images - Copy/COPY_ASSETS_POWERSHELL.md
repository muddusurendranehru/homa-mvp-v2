# Copy assets to web\public\images – PowerShell commands

**Destination folder:** `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web\public\images`

**Naming:** lowercase, hyphens only. Use exact names below so the site can reference them.

---

## Run from PowerShell (copy-paste one block at a time, or all)

```powershell
$dest = "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web\public\images"
$src  = "C:\Users\MYPC\.cursor\projects\c-Users-MYPC-Desktop-DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\assets\c__Users_MYPC_AppData_Roaming_Cursor_User_workspaceStorage_0bad788c26766ff785140894ffdbc339_images"

# MVP / info
Copy-Item "$src\mvpinfo1-af59b424-2cce-465b-85fb-ee6fbe8f799c.png" -Destination "$dest\mvp-info-1.png"
# TyG calculator / central obesity (South Indian woman, waist, QR)
Copy-Item "$src\tygcalcgrok1-2f8e02e8-c14f-4904-a799-8b66288a9e2e.png" -Destination "$dest\central-obesity-tyg-infographic.png"
Copy-Item "$src\tyggraok2-b7475698-307a-4611-af06-08c720e1345e.png" -Destination "$dest\tyg-infographic-2.png"
Copy-Item "$src\tyggrokmess1-ba0fa5e8-8d9f-43d6-9801-87c5195be81a.png" -Destination "$dest\tyg-message-1.png"
Copy-Item "$src\tyggrokwc1-03ec97e6-f4de-48b5-a5a0-e299b99d6580.png" -Destination "$dest\tyg-waist-1.png"
Copy-Item "$src\tygrokwbv2-624ef9b0-ca10-464f-afa8-115c22824605.png" -Destination "$dest\tyg-waist-2.png"
# QR codes
Copy-Item "$src\qrtyg1-8b52ecb0-2810-443d-aea3-7ebdeb80a3dc.png" -Destination "$dest\qr-tyg-calculator.png"
Copy-Item "$src\QRCODEMVP1-9ed8561a-5daf-43bb-b311-a872ea7728b5.png" -Destination "$dest\qr-mvp-drmuddus.png"
Copy-Item "$src\qrteaching1-5d44d9d3-67f7-4dd9-9995-0a1d860f187e.png" -Destination "$dest\qr-teaching-1.png"
# Grok / platform graphics
Copy-Item "$src\grok-image-69fd484c-0dd7-444a-9067-a4532aabd758-9c312fe7-14f9-4d93-a309-bfdd0ebb16bb.png" -Destination "$dest\grok-infographic-1.png"
Copy-Item "$src\grok-image-f4cbbacf-271a-4bfd-abaa-42fa4a2025c9-ca1cb830-7c72-4353-9d1d-025e712c2f7c.png" -Destination "$dest\homa-clinic-breakthrough-live.png"
# Partners
Copy-Item "$src\partner1__1_-0cd6faf6-accb-4936-9c5d-76f62a599051.png" -Destination "$dest\partner-1a.png"
Copy-Item "$src\partner1-fbf458ba-f42c-46a1-931a-dffdaf48f48e.png" -Destination "$dest\partner-1.png"
# References / teaching
Copy-Item "$src\References-9449ab6f-0a49-4b1e-8262-a88028bc6cac.png" -Destination "$dest\references-1.png"
# Testosterone / TRT
Copy-Item "$src\Testosterone_Deficiency_in_Metabolic_Syndrome___Type_2_Diabetes__1_-e080b92e-bd35-488a-9898-95790ae8e7ad.png" -Destination "$dest\testosterone-diabetes-guide-1.png"
Copy-Item "$src\Testosterone_Deficiency_in_Metabolic_Syndrome___Type_2_Diabetes-19e3a988-112b-4d4f-a795-96570367a014.png" -Destination "$dest\testosterone-diabetes-guide.png"
Copy-Item "$src\testo1-a11acdd5-757b-460a-9418-2beaab07c796.png" -Destination "$dest\testosterone-trt-infographic.png"
# PTH
Copy-Item "$src\PTH_Parathyroid_Hormone.pptx-e3f11758-2ad8-4b21-a293-0aa2876ddfc5.png" -Destination "$dest\pth-parathyroid-hormone.png"
# HOMA test / packages
Copy-Item "$src\image.jpg__1_-53d4a92f-9728-459f-a960-1d17d6278e57.png" -Destination "$dest\homa-test-package-1.png"
Copy-Item "$src\image.jpg-688bf37a-9a90-4cb0-b97e-eed0a236de81.png" -Destination "$dest\homa-test-package-2.png"
# Vertex slides
Copy-Item "$src\vertex1__1_-6723dfa2-c60d-4d0e-b260-df6f1f773c02.png" -Destination "$dest\vertex-slide-1a.png"
Copy-Item "$src\vertex1__2_-f6cfac5c-72a9-4c56-9d06-631c036d7be8.png" -Destination "$dest\vertex-slide-2.png"
Copy-Item "$src\vertex1__3_-752b813f-3eb0-4926-aaa3-93480e2eaeb3.png" -Destination "$dest\vertex-slide-3.png"
Copy-Item "$src\vertex1-41857c8c-12b6-4a5d-a0d1-76998d950fcc.png" -Destination "$dest\vertex-slide-1.png"
Copy-Item "$src\vertex1__4_-6f19c1cb-eadb-435d-951f-a478b291c0c2.png" -Destination "$dest\vertex-slide-4.png"
# Apple cider vinegar
Copy-Item "$src\acvapplemsn1-689d2cea-034d-4baf-93fc-e6c2a8a10d5f.png" -Destination "$dest\apple-cider-vinegar-diabetes-guide.png"
# Gemini
Copy-Item "$src\Gemini_Generated_Image_dz6dc5dz6dc5dz6d-4d408d62-6b61-4e06-b8f9-cb36055f833f.png" -Destination "$dest\gemini-promo-1.png"
```

---

## Exact filenames created (for use in code / pages)

| New filename | Use |
|--------------|-----|
| mvp-info-1.png | MVP info graphic |
| central-obesity-tyg-infographic.png | TyG / waist / South Indian woman |
| tyg-infographic-2.png | TyG graphic 2 |
| tyg-message-1.png | TyG message |
| tyg-waist-1.png, tyg-waist-2.png | TyG + waist |
| qr-tyg-calculator.png | QR for TyG calculator |
| qr-mvp-drmuddus.png | QR for drmuddus / MVP |
| qr-teaching-1.png | QR teaching |
| grok-infographic-1.png | Grok infographic |
| homa-clinic-breakthrough-live.png | Platform live / breakthrough |
| partner-1.png, partner-1a.png | Partner logos |
| references-1.png | References |
| testosterone-diabetes-guide.png, .png-1 | Testosterone & diabetes |
| testosterone-trt-infographic.png | TRT infographic |
| pth-parathyroid-hormone.png | PTH slide |
| homa-test-package-1.png, -2.png | HOMA test / discount |
| vertex-slide-1.png through 4.png | Vertex slides |
| apple-cider-vinegar-diabetes-guide.png | ACV & diabetes |
| gemini-promo-1.png | Gemini promo |

Use these names in your app as `/images/central-obesity-tyg-infographic.png`, etc.
