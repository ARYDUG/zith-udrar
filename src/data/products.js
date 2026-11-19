// Catalogue 100 % frontend. Modifiez les prix, numéros et tarifs de livraison ici.
// Tarifs Yalidine : grille publique 2025 (domicile / bureau stop desk), Tizi Ouzou gratuite.
const base = {
  "products": [
    {
      "id": "oil_1l",
      "name": "Bouteille 1L",
      "litres": 1,
      "price": {
        "FR": 4.0,
        "DZ": 800
      }
    },
    {
      "id": "oil_3l",
      "name": "Bidon 3L",
      "litres": 3,
      "price": {
        "FR": 12.0,
        "DZ": 2400
      }
    },
    {
      "id": "oil_5l",
      "name": "Bidon 5L",
      "litres": 5,
      "price": {
        "FR": 20.0,
        "DZ": 4000
      }
    }
  ],
  "shipping": {
    "FR": {
      "fee": 9.9,
      "currency": "EUR",
      "carrier": "La Poste (Colissimo)"
    },
    "DZ": {
      "fee": null,
      "currency": "DZD",
      "carrier": "Yalidine Express"
    }
  },
  "b2b_tiers": [
    {
      "id": "tier_50",
      "label": "50L+",
      "min_litres": 50,
      "price_per_litre": {
        "FR": null,
        "DZ": null
      }
    },
    {
      "id": "tier_100",
      "label": "100L+",
      "min_litres": 100,
      "price_per_litre": {
        "FR": null,
        "DZ": null
      }
    },
    {
      "id": "tier_palette",
      "label": "Palette",
      "min_litres": null,
      "price_per_litre": null
    }
  ],
  "welcome": {
    "percent": 20,
    "label": "Offre de bienvenue -20 %"
  },
  "phones": {
    "FR": "+33743634533",
    "DZ": "+213656921649"
  }
};

export const CATALOG = {
  ...base,
  wilayas: [
    { code: 1, name: "Adrar", fee: { domicile: 1500, stopdesk: 1200 } },
    { code: 2, name: "Chlef", fee: { domicile: 900, stopdesk: 650 } },
    { code: 3, name: "Laghouat", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 4, name: "Oum El Bouaghi", fee: { domicile: 900, stopdesk: 650 } },
    { code: 5, name: "Batna", fee: { domicile: 900, stopdesk: 650 } },
    { code: 6, name: "Béjaïa", fee: { domicile: 900, stopdesk: 650 } },
    { code: 7, name: "Biskra", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 8, name: "Béchar", fee: { domicile: 1500, stopdesk: 1200 } },
    { code: 9, name: "Blida", fee: { domicile: 700, stopdesk: 500 } },
    { code: 10, name: "Bouira", fee: { domicile: 900, stopdesk: 650 } },
    { code: 11, name: "Tamanrasset", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 12, name: "Tébessa", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 13, name: "Tlemcen", fee: { domicile: 900, stopdesk: 650 } },
    { code: 14, name: "Tiaret", fee: { domicile: 900, stopdesk: 650 } },
    { code: 15, name: "Tizi Ouzou", fee: { domicile: 0, stopdesk: 0 } },
    { code: 16, name: "Alger", fee: { domicile: 600, stopdesk: 500 } },
    { code: 17, name: "Djelfa", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 18, name: "Jijel", fee: { domicile: 900, stopdesk: 650 } },
    { code: 19, name: "Sétif", fee: { domicile: 900, stopdesk: 650 } },
    { code: 20, name: "Saïda", fee: { domicile: 900, stopdesk: 650 } },
    { code: 21, name: "Skikda", fee: { domicile: 900, stopdesk: 650 } },
    { code: 22, name: "Sidi Bel Abbès", fee: { domicile: 900, stopdesk: 650 } },
    { code: 23, name: "Annaba", fee: { domicile: 900, stopdesk: 650 } },
    { code: 24, name: "Guelma", fee: { domicile: 900, stopdesk: 650 } },
    { code: 25, name: "Constantine", fee: { domicile: 900, stopdesk: 650 } },
    { code: 26, name: "Médéa", fee: { domicile: 900, stopdesk: 650 } },
    { code: 27, name: "Mostaganem", fee: { domicile: 900, stopdesk: 650 } },
    { code: 28, name: "M'Sila", fee: { domicile: 900, stopdesk: 650 } },
    { code: 29, name: "Mascara", fee: { domicile: 900, stopdesk: 650 } },
    { code: 30, name: "Ouargla", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 31, name: "Oran", fee: { domicile: 900, stopdesk: 650 } },
    { code: 32, name: "El Bayadh", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 33, name: "Illizi", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 34, name: "Bordj Bou Arréridj", fee: { domicile: 900, stopdesk: 650 } },
    { code: 35, name: "Boumerdès", fee: { domicile: 700, stopdesk: 500 } },
    { code: 36, name: "El Tarf", fee: { domicile: 900, stopdesk: 650 } },
    { code: 37, name: "Tindouf", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 38, name: "Tissemsilt", fee: { domicile: 900, stopdesk: 650 } },
    { code: 39, name: "El Oued", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 40, name: "Khenchela", fee: { domicile: 900, stopdesk: 650 } },
    { code: 41, name: "Souk Ahras", fee: { domicile: 900, stopdesk: 650 } },
    { code: 42, name: "Tipaza", fee: { domicile: 700, stopdesk: 500 } },
    { code: 43, name: "Mila", fee: { domicile: 900, stopdesk: 650 } },
    { code: 44, name: "Aïn Defla", fee: { domicile: 900, stopdesk: 650 } },
    { code: 45, name: "Naâma", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 46, name: "Aïn Témouchent", fee: { domicile: 900, stopdesk: 650 } },
    { code: 47, name: "Ghardaïa", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 48, name: "Relizane", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 49, name: "Timimoun", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 50, name: "Bordj Badji Mokhtar", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 51, name: "Ouled Djellal", fee: { domicile: 1050, stopdesk: 800 } },
    { code: 52, name: "Béni Abbès", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 53, name: "In Salah", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 54, name: "In Guezzam", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 55, name: "Touggourt", fee: { domicile: 1500, stopdesk: 1200 } },
    { code: 56, name: "Djanet", fee: { domicile: 1700, stopdesk: 1300 } },
    { code: 57, name: "El M'Ghair", fee: { domicile: 1500, stopdesk: 1200 } },
    { code: 58, name: "El Meniaa", fee: { domicile: 1500, stopdesk: 1200 } },
  ],
};
