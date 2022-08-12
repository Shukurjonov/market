Boshlang'ich kod

/v1/auth/register
  .post 
  req.body = {
    "firstName": "falonchi",
    "lastName": "falonchiyev",
    "username" : "support",
    "password": "12345678",
    "roleId" : "52b57078-5168-4725-a3e0-181bcb1929a3"
  }

v1/auth/login
  .post 
  req.body = {
    "username": "support",
    "password": "12345678"
  }

  
/v1/api/home/category
  .get 

  res = {
    "message": "allCategory",
    "data": [
        {
            "id": "12ab74c5-0cf8-45a2-a9dd-14af8336cdaf",
            "name": "Каркасные",
            "name_uz": "Karkasli",
            "state": true,
            "status": true
        },
        {
            "id": "662077c6-b256-4a3d-94c7-014abd40773a",
            "name": "Надувные",
            "name_uz": "Shishiladigan",
            "state": true,
            "status": true
        }
    ]
  }


/v1/api/home/product
  .get

/v1/api/home/product/category/:categoryId
  .get

/v1/api/home/product/:productId
  .get

  {
        "id": "21437de8-5bdb-4bdc-a00a-7a4e96b88b4b",
        "category_id": "c059e455-04db-41f0-8c91-a5f81c826479",
        "picture_link": "/img/image2134564778.jpg",
        "price": "1582000",
        "sale_price": "1250000",
        "quantity": "10",
        "frame": "?????????????",
        "frame_uz": "To'rtburchak",
        "size": "1.34",
        "depth": "21",
        "state": true,
        "status_name": "ru",
        "status_name_uz": "uz",
        "equipment": "Baseyn va karkastlari",
        "equipment_uz": "??????? ? ?????"
    }


/v1/api/home/site
   res: 
    {
      phone_number: '(998) 99 911 02 04',
      address: 'Улица Пахлавона Махмуда, Яшнабадский район, город Ташкент',
      address_uz: 'Toshkent shahri, Yashnobod tumani, Paxlavon Mahmud ko‘chasi',
      work_time: 'Будние дни: 10:00 - 22:00 Без выходных',
      work_uz_time: 'Ish kunlari: 10:00 - 22:00. Haftada etti kun',
      telegram_link: 'https://www.telegram.com/intex-market_uz/',
      instagram_link: 'https://www.instagram.com/intex-market_uz/'
    }
  

/v1/api/order 
  .get
  .post
      productId, name, phone_number, address
  .delete
      orderId
  .put
      orderId


/v1/api/category
  .get
  .post
      name, name_uz
  .delete
      categoryId
  .put
      caregoryId


/v1/api/product 
  .get
  .post
  .delete
      productId
  .put
      productId

/v2 api