const db = require('../models');

async function seed() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: true });

    const sellers = await db.Seller.bulkCreate([
      {
        name: 'Արամ Հակոբյան',
        email: 'aram@example.com',
        phone: '+374 91 123456',
        address: 'Երևան, Մաշտոցի պող. 15',
        rating: 4.5,
      },
      {
        name: 'Աննա Գրիգորյան',
        email: 'anna@example.com',
        phone: '+374 93 234567',
        address: 'Երևան, Աբովյան պող. 22',
        rating: 4.8,
      },
      {
        name: 'Սարգիս Մկրտչյան',
        email: 'sargis@example.com',
        phone: '+374 94 345678',
        address: 'Գյումրի, Գայի պող. 8',
        rating: 4.2,
      },
      {
        name: 'Մարինե Պետրոսյան',
        email: 'marine@example.com',
        phone: '+374 95 456789',
        address: 'Վանադզոր, Տիգրան Մեծի պող. 3',
        rating: 4.7,
      },
      {
        name: 'Դավիթ Հովհաննիսյան',
        email: 'davit@example.com',
        phone: '+374 96 567890',
        address: 'Երևան, Տերյան պող. 45',
        rating: 4.0,
      },
    ]);

    await db.Product.bulkCreate([
      {
        name: 'Սմարթֆոն iPhone 15',
        description: 'Ամենավերջին սմարթֆոն հզոր տեսախցիկով',
        price: 499000,
        image: 'https://placehold.co/400x300/F59E0B/white?text=iPhone+15',
        category: 'Էլեկտրոնիկա',
        stock: 25,
        sellerId: sellers[0].id,
      },
      {
        name: 'Նութբուք Dell XPS 15',
        description: 'Հզոր նութբուք աշխատանքի և բիզնեսի համար',
        price: 850000,
        image: 'https://placehold.co/400x300/D97706/white?text=Dell+XPS',
        category: 'Էլեկտրոնիկա',
        stock: 10,
        sellerId: sellers[0].id,
      },
      {
        name: 'Սուրճի սարք',
        description: 'Բարձրակարգ սուրճի սարք բնական աղացով',
        price: 15000,
        image: 'https://placehold.co/400x300/B45309/white?text=Coffee',
        category: 'Սննդ',
        stock: 100,
        sellerId: sellers[1].id,
      },
      {
        name: 'Սպորտային կոշիկներ',
        description: 'Հարմարավետ սպորտային կոշիկներ վազքի համար',
        price: 35000,
        image: 'https://placehold.co/400x300/92400E/white?text=Shoes',
        category: 'Հագուստ',
        stock: 50,
        sellerId: sellers[1].id,
      },
      {
        name: 'Գիրք հայկական պատմություն',
        description: 'Հայկական պատմություն պատկերներով',
        price: 12000,
        image: 'https://placehold.co/400x300/78350F/white?text=Book',
        category: 'Գրքեր',
        stock: 200,
        sellerId: sellers[2].id,
      },
      {
        name: 'Ականջակալներ Samsung',
        description: 'Անլար ականջակալներ բարձր ձայնային որակով',
        price: 45000,
        image: 'https://placehold.co/400x300/FBBF24/black?text=Earbuds',
        category: 'Էլեկտրոնիկա',
        stock: 75,
        sellerId: sellers[2].id,
      },
      {
        name: 'Նկարչահավաք սեթ',
        description: 'Պրոֆեսիոնալ նկարչահավաք 12 գույներով',
        price: 28000,
        image: 'https://placehold.co/400x300/FCD34D/black?text=Art+Set',
        category: 'Արվեստ',
        stock: 30,
        sellerId: sellers[3].id,
      },
      {
        name: 'Սեղանի թեյատուփ',
        description: 'Սեղանի սեղմակիչ թեյատուփ համակարգչով',
        price: 120000,
        image: 'https://placehold.co/400x300/FDE68A/black?text=Table',
        category: 'Կահույք',
        stock: 8,
        sellerId: sellers[3].id,
      },
      {
        name: 'Մարզիչ հետաքրքիր',
        description: 'Մարզիչ տղամարդկանց հետաքրքիր մշտական սպորտի համար',
        price: 22000,
        image: 'https://placehold.co/400x300/F59E0B/white?text=Fitness',
        category: 'Սպորտ',
        stock: 40,
        sellerId: sellers[4].id,
      },
      {
        name: 'Պայուսակ USB-C',
        description: 'Արագ լիցքավորման պայուսակ 20000mAh',
        price: 18000,
        image: 'https://placehold.co/400x300/D97706/white?text=PowerBank',
        category: 'Էլեկտրոնիկա',
        stock: 60,
        sellerId: sellers[4].id,
      },
      {
        name: 'Բնական մեղր սեթ',
        description: 'Օրգանական բնական մեղր 100գ հայկական արտադրություն',
        price: 8500,
        image: 'https://placehold.co/400x300/B45309/white?text=Honey',
        category: 'Սննդ',
        stock: 150,
        sellerId: sellers[1].id,
      },
      {
        name: 'Արևելյան եներգիա',
        description: 'Արևելյան տնակարգ վահանակ 200W',
        price: 350000,
        image: 'https://placehold.co/400x300/92400E/white?text=Solar',
        category: 'Էլեկտրոնիկա',
        stock: 5,
        sellerId: sellers[4].id,
      },
    ]);

    await db.Notification.bulkCreate([
      {
        productName: 'Սմարթֆոն iPhone 15',
        productPrice: 499000,
        sellerName: 'Արամ Հակոբյան',
        quantity: 1,
        totalAmount: 499000,
        status: 'delivered',
        purchasedAt: new Date('2026-05-10'),
        read: true,
      },
      {
        productName: 'Սուրճի սարք',
        productPrice: 15000,
        sellerName: 'Աննա Գրիգորյան',
        quantity: 3,
        totalAmount: 45000,
        status: 'shipped',
        purchasedAt: new Date('2026-05-14'),
        read: false,
      },
      {
        productName: 'Սպորտային կոշիկներ',
        productPrice: 35000,
        sellerName: 'Աննա Գրիգորյան',
        quantity: 1,
        totalAmount: 35000,
        status: 'pending',
        purchasedAt: new Date('2026-05-16'),
        read: false,
      },
      {
        productName: 'Նկարչահավաք սեթ',
        productPrice: 28000,
        sellerName: 'Մարինե Պետրոսյան',
        quantity: 2,
        totalAmount: 56000,
        status: 'delivered',
        purchasedAt: new Date('2026-05-08'),
        read: true,
      },
    ]);

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
