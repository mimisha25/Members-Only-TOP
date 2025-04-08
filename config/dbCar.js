const { Client } = require('pg');
require('dotenv').config();
const date = new Date().toISOString();

const CREATE_SQL_CATEGORY = `
CREATE TABLE IF NOT EXISTS categories(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon TEXT, 
    status VARCHAR(50),
    prevent_deletion BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;


const CREATE_SQL_CARS = `
CREATE TABLE IF NOT EXISTS cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    image TEXT
);
`;

const INSERT_CATEGORY = `
INSERT INTO categories (name, description, icon)
VALUES
    ('Tesla', 'Tesla', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1200px-Tesla_logo.png'),
    ('Lamborghini', 'Lamborghini', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/360px-Lamborghini_Logo.svg.png'),
    ('Rolls Royce', 'Rolls Royce', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rolls_royce_holdings_logo.svg/240px-Rolls_royce_holdings_logo.svg.png'),
    ('Bugatti', 'Bugatti','https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bugatti_logo.svg/440px-Bugatti_logo.svg.png' ),
    ('Mercedes', 'Mercedes','https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mercedes-Benz_Logo_2010.svg/440px-Mercedes-Benz_Logo_2010.svg.png' ),
    ('Audi', 'Audi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/440px-Audi-Logo_2016.svg.png'),
    ('Bentley', 'Bentley', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Bentley_logo_2.svg/440px-Bentley_logo_2.svg.png'),
    ('Maserati', 'Maserati', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Maserati_logo_2.svg/440px-Maserati_logo_2.svg.png'),
    ('McLaren', 'McLaren', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/McLaren_Racing_logo.svg/440px-McLaren_Racing_logo.svg.png'),
    ('Ferrari', 'Ferrari', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Prancing_horse.svg/160px-Prancing_horse.svg.png'),
    ('Aston Martin', 'Aston Martin', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Aston_Martin_Lagonda_brand_logo.png/440px-Aston_Martin_Lagonda_brand_logo.png')
    ;`;



const INSERT_CAR = `
    INSERT INTO cars (title, description,  category_id,  image)
    VALUES ($1, $2, $3, $4);`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DB_URL,
    })
    await client.connect();

    try {
        console.log('Creating tables...');
        await client.query(CREATE_SQL_CATEGORY);
        await client.query(CREATE_SQL_CARS);


        console.log('Inserting categories...');
        await client.query(INSERT_CATEGORY);

        console.log('Inserting cars...');
        const categoryIds = await client.query('SELECT id FROM categories');

        const categoryId1 = categoryIds.rows[0].id;
        const categoryId2 = categoryIds.rows[1].id;
        const categoryId3 = categoryIds.rows[2].id;
        const categoryId4 = categoryIds.rows[3].id;
        const categoryId5 = categoryIds.rows[4].id;
        const categoryId6 = categoryIds.rows[5].id;
        const categoryId7 = categoryIds.rows[6].id;
        const categoryId8 = categoryIds.rows[7].id;
        const categoryId9 = categoryIds.rows[8].id;
        const categoryId10 = categoryIds.rows[9].id;
        const categoryId11 = categoryIds.rows[10].id;

        await client.query(INSERT_CAR, [
            'Tesla Model S',
            'The Tesla Model S is a luxury electric sedan that combines cutting-edge technology with performance. With impressive acceleration, a long-range battery, and a sleek design, the Model S offers a futuristic driving experience.',
            categoryId1,
            'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Performance-Mobile.jpg']);

        await client.query(INSERT_CAR, [
            'Tesla Model 3',
            'The Tesla Model 3 is a compact electric sedan that provides an affordable yet high-performance alternative in the electric vehicle market. Known for its minimalist design, long battery range, and advanced safety features, the Model 3 is perfect for those seeking efficiency and modernity.',
            categoryId1,
            'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Exterior-Hero-Mobile-LHD.jpg']);

        await client.query(INSERT_CAR, [
            'Tesla Model Y',
            'The Tesla Model Y is an electric compact SUV that provides ample space for passengers and cargo while delivering impressive performance and range. It is built on the same platform as the Model 3 but offers more versatility and family-friendly features.',
            categoryId1,
            'https://digitalassets.tesla.com/discovery-tesla-com/image/upload/f_auto,q_auto/TD_Component_MY_Tablet.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Tesla CyberTruck',
            'The Tesla Cybertruck is an all-electric pickup truck with a bold, futuristic design and high durability. Built to handle tough terrains with its armored exoskeleton and rugged performance, the Cybertruck is a vehicle for the adventurous at heart.',
            categoryId1,
            'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Keep-the-Adventure-Going-Carousel-Slide-1-Lightbar-Desktop.png'
        ]);

        await client.query(INSERT_CAR, [
            'Tesla Model X',
            'The Tesla Model X is an all-electric SUV that boasts innovative falcon-wing doors, spacious seating for up to seven, and top-tier performance. With outstanding safety features and long-range capabilities, the Model X is a true family luxury vehicle.',
            categoryId1,
            'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Performance-Mobile.jpg'
        ]);

        await client.query(INSERT_CAR, [
            'Lamborghini Temerario',
            'The Lamborghini Temerario is a limited-edition hypercar that blends speed with luxury. Featuring an aggressive design, the Temerario delivers an adrenaline-pumping driving experience with its powerful engine and eye-catching aesthetics.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/temerario/temerario/centrostile/sketch1.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Revuelto',
            'The Lamborghini Revuelto is a stunning hybrid supercar that fuses futuristic technology with unparalleled performance. Its sleek lines, coupled with a V12 engine, provide an exhilarating ride, combining power and environmental consciousness.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/revuelto/2024/09_18_refresh/img-left-mobile.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Urus SE',
            'The Lamborghini Urus SE is a special edition of the luxury SUV, designed to elevate performance with an upgraded powertrain and enhanced driving dynamics. The Urus SE offers a thrilling experience while maintaining its luxurious and comfortable interior.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/urus_se/s/image_s_mob_1.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Urus S',
            'The Lamborghini Urus S is a powerful luxury SUV that blends supercar performance with off-road capabilities. With a 4.0-liter twin-turbocharged V8 engine, it delivers 657 horsepower, enabling exhilarating acceleration and an unmistakable Lamborghini roar. The Urus S combines dynamic handling with the brand’s iconic bold styling, making it the ultimate high-performance SUV. Inside, the cabin exudes luxury with premium materials, advanced tech, and a customisable experience suited to every need.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/gateway_urus/s/2024/09_18_refresh/img-left-mobile.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Urus Performante',
            'The Lamborghini Urus Performante takes the already potent Urus SUV to the next level with enhanced performance, sharper handling, and a lighter, more dynamic design. Powered by the same 4.0-liter twin-turbo V8 engine but tuned for even greater power, the Urus Performante is designed for those who crave an extreme driving experience, whether on-road or off. Its aggressive, aerodynamically optimized exterior and performance-focused interior push the boundaries of what an SUV can do.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/gateway_urus/performante/2023/10_18_refresh/over/urus_perf_over_01_m.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Huracan Evo Spyder',
            'The Lamborghini Huracán Evo Spyder is an open-top supercar designed for ultimate performance and driving pleasure. With its naturally aspirated V10 engine, the Evo Spyder offers unmatched thrills, whether on the open road or racing track.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/huracan/evo_spyder/2023/11_27_refresh/over/hura_evo_spy_over_01_m.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Huracan STO',
            'The Lamborghini Huracán STO is a track-focused supercar that delivers incredible performance with its lightweight design and aggressive aerodynamics. Perfect for enthusiasts, the STO offers an authentic motorsport experience on the road.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/huracan/sto/2023/10_18_refresh/over/hura_sto_over_01_m.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Huracan Tecnica',
            'The Huracán Tecnica is a track-focused iteration of Lamborghini’s iconic Huracán. Powered by a naturally aspirated V10 engine, it delivers a thrilling 640 horsepower for exceptional speed and handling. With precise steering, lightweight construction, and a refined yet aggressive design, the Tecnica offers a perfect balance of daily driveability and track-ready performance. Inside, the cabin combines racing-inspired elements with advanced technology and luxurious finishes, making it a true driver’s car.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/huracan/tecnica/2023/11_06_refresh/s/ext_mob.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Lamborghini Huracan Sterrato',
            'The Huracán Sterrato is an off-road-focused variant of the iconic Huracán. With rugged, all-terrain tires, raised suspension, and a 5.2-liter V10 engine delivering 610 horsepower, the Sterrato is engineered for adventure. Its bold, muscular design and increased ground clearance ensure that it’s ready to tackle gravel roads and dirt trails, without compromising the Lamborghini performance and thrills on offer. It’s a rare combination of supercar performance and off-road capability.',
            categoryId2,
            'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/huracan/sterrato/over/2023/overview_m.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Rolls Royce PHANTOM VIII',
            'The Rolls-Royce Phantom VIII is the epitome of luxury and craftsmanship. Combining elegant design with cutting-edge technology, the Phantom offers unrivaled comfort, smooth performance, and a ride that is second to none.',
            categoryId3,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Geneva_International_Motor_Show_2018%2C_Le_Grand-Saconnex_%281X7A9741%29.jpg/1599px-Geneva_International_Motor_Show_2018%2C_Le_Grand-Saconnex_%281X7A9741%29.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Rolls-Royce Spectre',
            'The Rolls-Royce Spectre is the luxury automakers first all-electric vehicle. Designed for the discerning elite, it offers a whisper-quiet ride and all the refinement expected from Rolls-Royce, along with impressive electric performance.',
            categoryId3,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/2024_Rolls-Royce_Spectre_in_Midnight_Sapphire_over_Silver%2C_front_left.jpg/560px-2024_Rolls-Royce_Spectre_in_Midnight_Sapphire_over_Silver%2C_front_left.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Rolls-Royce Ghost',
            'The Rolls-Royce Ghost is a symbol of understated luxury. With its refined design and superlative attention to detail, the Ghost provides a smooth, quiet ride, showcasing exceptional engineering and luxurious comfort.',
            categoryId3,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/2023_Rolls-Royce_Ghost_Black_Badge_in_Tempest_Grey%2C_front_right.jpg/400px-2023_Rolls-Royce_Ghost_Black_Badge_in_Tempest_Grey%2C_front_right.jpg'
        ]);

        await client.query(INSERT_CAR, [
            'Rolls-Royce Cullinan',
            'The Rolls-Royce Cullinan is the epitome of luxury and sophistication in the SUV segment. ',
            categoryId3,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/2024_Rolls-Royce_Cullinan_V12_-_6749cc_6.75_%28571PS%29_Petrol_-_Salamanca_Blue_-_01-2025%2C_Side.jpg/440px-2024_Rolls-Royce_Cullinan_V12_-_6749cc_6.75_%28571PS%29_Petrol_-_Salamanca_Blue_-_01-2025%2C_Side.jpg'
        ]);

        await client.query(INSERT_CAR, [
            'Bugatti Veyron',
            'The Bugatti Veyron is a legendary hypercar that pushed the boundaries of automotive engineering. With its 8.0-liter quad-turbocharged W16 engine, the Veyron was the first production car to surpass 250 mph, setting numerous speed records. Combining extraordinary performance with luxury and innovative technology, it remains an iconic symbol of automotive excellence, embodying Bugatti’s passion for creating the ultimate driving machine.',
            categoryId4,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/560px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bugatti Chiron',
            'The Bugatti Chiron builds on the legacy of the Veyron with an even more powerful 8.0-liter quad-turbocharged W16 engine, delivering an astonishing 1,479 horsepower. It is a true masterpiece of engineering, blending mind-blowing speed with luxurious craftsmanship and cutting-edge technology. The Chiron is built for ultimate performance on both road and track, offering a driving experience like no other, while ensuring unrivaled comfort and style.',
            categoryId4,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/560px-Bugatti_Chiron_1.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bugatti Divo',
            'The Bugatti Divo is a hypercar designed for ultimate agility and handling on the track, offering a more dynamic, race-inspired version of the Chiron. With enhanced aerodynamics, a more lightweight structure, and a tuned version of the Chiron’s 1,479-horsepower engine, the Divo is built for enthusiasts who demand precision and cornering performance. Its distinctive design and extreme performance make it a standout among Bugatti’s exclusive collection.',
            categoryId4,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bugatti_Divo%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0029%29.jpg/560px-Bugatti_Divo%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0029%29.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bugatti Centodieci',
            'The Bugatti Centodieci is a tribute to the brand’s iconic EB110, offering a unique blend of history and modern hypercar performance. Powered by an 8.0-liter W16 engine producing 1,600 horsepower, it accelerates from 0 to 60 mph in just 2.4 seconds, showcasing Bugatti’s relentless pursuit of speed and innovation. With its exclusive design and extreme performance, the Centodieci is a limited-edition masterpiece that pushes the boundaries of luxury and engineering.',
            categoryId4,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/2022_Bugatti_Centodieci_in_Grigio_Chiaro%2C_front_right1.jpg/560px-2022_Bugatti_Centodieci_in_Grigio_Chiaro%2C_front_right1.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bugatti Bolide',
            'The Bugatti Bolide is a track-focused hypercar that takes Bugatti’s performance to an entirely new level. With a lightweight, carbon fiber-intensive structure and a 1,824-horsepower quad-turbocharged W16 engine, the Bolide is built for speed, agility, and precision. Its futuristic design and extreme performance capabilities make it a true track weapon, offering unparalleled driving thrills for those seeking the ultimate in driving experiences.',
            categoryId4,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2024_Bugatti_Bolide_4.jpg/560px-2024_Bugatti_Bolide_4.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bugatti Mistral',
            'The Bugatti Mistral is an open-top hypercar that offers an unfiltered driving experience with the iconic W16 engine producing 1,500 horsepower. With a sleek, aerodynamic design and a focus on performance, the Mistral embodies Bugatti’s commitment to blending luxury with extreme speed. Its open-top configuration allows drivers to fully immerse themselves in the sound and sensation of the W16 engine, making it a unique addition to the brand’s hypercar collection.',
            categoryId4,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Bugatti_Mistral_2.jpg/560px-Bugatti_Mistral_2.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bugatti Tourbillon',
            'The Bugatti Tourbillon is an exclusive timepiece that draws inspiration from Bugattis automotive design and engineering. Crafted with precision and showcasing the brand’s signature attention to detail, the Tourbillon offers a perfect balance of luxury and innovation. Its design reflects Bugatti’s passion for high performance and craftsmanship, making it a true collector’s item for enthusiasts of both fine watches and high-performance cars.',
            categoryId4,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Bugatti_Tourbillon.jpg/560px-Bugatti_Tourbillon.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Mercedes-Benz GLB',
            'The Mercedes-Benz GLB is a compact luxury SUV that offers a blend of practicality, versatility, and premium features. With its 7-passenger seating capacity, the GLB is perfect for families who need space without sacrificing luxury. The cabin features a sophisticated design, advanced tech, and high-quality materials. It’s available with both front-wheel-drive and all-wheel-drive options, making it a capable performer in various conditions.',
            categoryId5,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mercedes-Benz_X247_IMG_5751.jpg/560px-Mercedes-Benz_X247_IMG_5751.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Mercedes-Benz CLE',
            'The Mercedes-Benz CLE is a luxurious coupe that combines striking design with advanced technology and exhilarating performance. With sleek lines and an aggressive stance, the CLE represents the brand’s commitment to blending sophistication with sportiness. Whether on the highway or winding backroads, the CLE offers a dynamic driving experience with an array of powerful engine options and a premium interior that exudes class and comfort.',
            categoryId5,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mercedes-Benz_CLE_200_Coup%C3%A9_AMG_Line_%28C_236%29_%E2%80%93_f_21012024.jpg/560px-Mercedes-Benz_CLE_200_Coup%C3%A9_AMG_Line_%28C_236%29_%E2%80%93_f_21012024.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Mercedes-Benz SL (R231)',
            'The Mercedes-Benz SL (R231) is a high-performance luxury roadster that brings together advanced technology, refinement, and power. With a range of engine options, including a V6 and V8, the R231 offers an engaging driving experience, complemented by a plush interior and a sleek design. It’s an iconic symbol of Mercedes-Benz’s performance prowess, offering a perfect balance of speed, comfort, and style.',
            categoryId5,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Mercedes-Benz_SL_350_%28R_231%29_%E2%80%93_Frontansicht_ge%C3%B6ffnet_%281%29%2C_22._Mai_2013%2C_D%C3%BCsseldorf.jpg/560px-Mercedes-Benz_SL_350_%28R_231%29_%E2%80%93_Frontansicht_ge%C3%B6ffnet_%281%29%2C_22._Mai_2013%2C_D%C3%BCsseldorf.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Mercedes-Benz SL (R230)',
            'The Mercedes-Benz SL (R230) is a previous-generation luxury roadster that established itself as a benchmark in performance and elegance. Powered by a range of V6, V8, and V12 engines, the R230 offers powerful acceleration and exceptional handling. Inside, the cabin is adorned with premium materials, and the retractable hardtop adds to the SL’s versatility, making it a great choice for both spirited drives and relaxed cruising.',
            categoryId5,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mercedes_R230_front_20071102.jpg/560px-Mercedes_R230_front_20071102.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Audi S8',
            'The Audi R8 V10 is a high-performance supercar that delivers exhilarating power and precision on the road. Featuring a naturally aspirated V10 engine and Audis Quattro all-wheel drive system, the R8 offers an unmatched driving experience with dynamic handling and stunning speed.',
            categoryId6,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Audi_S8_-_Tokyo_Motor_Show_2013.jpg/560px-Audi_S8_-_Tokyo_Motor_Show_2013.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Audi Q7',
            'The Audi Q7 is a spacious, luxurious SUV that combines performance, technology, and comfort. With three rows of seating and advanced safety features, the Q7 is the perfect vehicle for families seeking a versatile yet refined driving experience.',
            categoryId6,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/2017_Audi_Q7_S_Line_Quattro_3.0_Front.jpg/560px-2017_Audi_Q7_S_Line_Quattro_3.0_Front.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Audi Q8',
            'The Audi Q8 is a luxury SUV that combines sporty performance with cutting-edge technology and a luxurious interior. With a powerful turbocharged V6 engine, it delivers a dynamic driving experience while maintaining a high level of comfort and refinement. The Q8s striking design, with its aggressive stance and coupe-like silhouette, stands out in the crowded luxury SUV market, offering a sophisticated blend of performance, utility, and style.',
            categoryId6,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2018_Audi_Q8_S_Line_50_TDi_Quattro_3.0_Front.jpg/560px-2018_Audi_Q8_S_Line_50_TDi_Quattro_3.0_Front.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bentley Mulsanne',
            'The Bentley Mulsanne is the epitome of British luxury, offering unmatched craftsmanship, performance, and elegance. Powered by a 6.75-liter V8 engine, the Mulsanne provides an effortlessly smooth driving experience, whether on long drives or winding roads. The interior is a testament to Bentley’s commitment to excellence, with hand-stitched leather, exquisite wood veneers, and advanced technology, making it one of the most opulent sedans on the market.',
            categoryId7,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bentley_Mulsanne_%E2%80%93_Frontansicht_%285%29%2C_30._August_2011%2C_D%C3%BCsseldorf.jpg/560px-Bentley_Mulsanne_%E2%80%93_Frontansicht_%285%29%2C_30._August_2011%2C_D%C3%BCsseldorf.jpg'
        ]);

        await client.query(INSERT_CAR, [
            'Bentley Flying Spur',
            'The Bentley Flying Spur is a luxurious grand sedan that combines performance with elegance. With a choice of W12, V8, or V6 hybrid engines, it offers a perfect balance of power and refinement. The cabin features the finest materials, custom finishes, and cutting-edge technology, ensuring a first-class experience for both driver and passengers. Whether for long journeys or spirited drives, the Flying Spur delivers an exceptional blend of comfort and performance.',
            categoryId7,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Bentley_Flying_Spur_%E2%80%93_Frontansicht_%282%29%2C_12._August_2013%2C_D%C3%BCsseldorf.jpg/560px-Bentley_Flying_Spur_%E2%80%93_Frontansicht_%282%29%2C_12._August_2013%2C_D%C3%BCsseldorf.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Bentley Continental GT W12',
            'The Bentley Continental GT W12 is a performance-oriented grand tourer with a powerful 6.0-liter W12 engine, delivering breathtaking speed and refinement. Its luxurious interior is crafted with exceptional materials, offering the perfect blend of style, comfort, and technology. With advanced suspension and precise handling, the Continental GT W12 offers an exhilarating driving experience, whether on a winding mountain road or the open highway.',
            categoryId7,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/2019_Bentley_Continental_GT_Coupe_6.0_Front.jpg/560px-2019_Bentley_Continental_GT_Coupe_6.0_Front.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Maserati MC20',
            'The Maserati MC20 is a high-performance supercar that redefines the brands racing heritage. Powered by a twin-turbo V6 engine, the MC20 offers blistering acceleration, exceptional handling, and a striking design. With its lightweight construction and futuristic technology, the MC20 marks Maseratis return to the world of supercars, offering an uncompromising blend of speed, innovation, and luxury.',
            categoryId8,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Maserati_MC20_IAA_2021_1X7A0087.jpg/560px-Maserati_MC20_IAA_2021_1X7A0087.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Maserati Grecale',
            'The Maserati Grecale is a luxurious and sporty SUV designed for those who seek both performance and versatility. With a dynamic engine lineup, elegant design, and cutting-edge technology, the Grecale delivers an exhilarating driving experience while providing the space and practicality needed for everyday life.',
            categoryId8,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Maserati_Grecale_GT_1X7A6371.jpg/560px-Maserati_Grecale_GT_1X7A6371.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Maserati GranTurismo',
            'The Maserati GranTurismo is a luxury sports coupe that perfectly blends performance and elegance. With a powerful V8 engine and an unmistakable Italian design, the GranTurismo offers a thrilling driving experience paired with exceptional comfort and refinement, making it the ideal grand tourer for those who crave both style and performance.',
            categoryId8,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Maserati_GranTurismo_Trofeo_IMG_7283.jpg/560px-Maserati_GranTurismo_Trofeo_IMG_7283.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'McLaren Elva',
            'The McLaren Elva is a lightweight, open-cockpit roadster designed to provide an unfiltered connection between driver and machine. With a focus on pure driving pleasure, the Elva features a powerful twin-turbocharged V8 engine, advanced suspension, and a minimalist design that prioritizes performance and sensory excitement. The Elva is one of the most immersive and exclusive driving experiences in McLarens range.',
            categoryId9,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/2021_McLaren_Elva_4.0_Front.jpg/560px-2021_McLaren_Elva_4.0_Front.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'McLaren Speedtail',
            'The McLaren Speedtail is a hypercar that defines the pinnacle of speed and aerodynamic performance. With a striking design and a hybrid powertrain that delivers over 1,000 horsepower, the Speedtail is engineered for unparalleled top speeds, exceptional handling, and luxury. Its futuristic silhouette, combined with cutting-edge technology, ensures an extraordinary driving experience that only McLaren can deliver.',
            categoryId9,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/McLaren_Speedtail_Genf_2019_1Y7A5636.jpg/560px-McLaren_Speedtail_Genf_2019_1Y7A5636.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'McLaren 750S',
            'The McLaren 750S is a true performance icon, designed to deliver precision, agility, and exceptional speed. Featuring a refined version of McLarens iconic 720S engine, the 750S boasts enhanced aerodynamics, a lightweight carbon fiber structure, and exceptional handling dynamics. Its the perfect balance between everyday usability and the track-ready performance McLaren is renowned for.',
            categoryId9,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/2023_McLaren_750S_1.jpg/560px-2023_McLaren_750S_1.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'McLaren Solus GT',
            'The McLaren Solus GT is a track-focused hypercar that is all about uncompromised performance. Powered by a naturally aspirated V10 engine, the Solus GT delivers extreme acceleration, unparalleled downforce, and razor-sharp handling, all in a single-seater design. With its unique styling and race-inspired engineering, the Solus GT is built for the enthusiast who seeks the ultimate track experience.',
            categoryId9,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/2023_McLaren_Solus_GT.jpg/560px-2023_McLaren_Solus_GT.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Ferrari GTC4Lusso',
            'The Ferrari GTC4Lusso is a high-performance grand tourer that combines exceptional driving dynamics with supreme luxury. Powered by a 6.3-liter V12 engine, it offers a perfect blend of power, agility, and comfort. With a sleek, aerodynamic design and advanced all-wheel-drive technology, the GTC4Lusso delivers an exhilarating driving experience, whether on the open road or winding mountain passes. Its spacious cabin and advanced tech make it a refined choice for those seeking both performance and elegance.',
            categoryId10,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ferrari_GTC4Lusso_IMG_4353.jpg/560px-Ferrari_GTC4Lusso_IMG_4353.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Ferrari F8',
            'The Ferrari F8 Tributo is a mid-engine supercar that exudes style and performance. Equipped with a turbocharged V8 engine, it offers breathtaking acceleration and exceptional handling, all wrapped in a design that showcases Ferraris design excellence.',
            categoryId10,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ferrari_F8_Tributo_Genf_2019_1Y7A5665.jpg/560px-Ferrari_F8_Tributo_Genf_2019_1Y7A5665.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Ferrari KC23',
            'The Ferrari KC23 is a unique, bespoke creation inspired by the brands racing heritage. Featuring a futuristic design and enhanced aerodynamics, the KC23 is a track-focused, limited-edition hypercar that blends innovative technology with Ferraris iconic performance capabilities. With a lightweight, carbon fiber-intensive structure, and a powerful V8 or V12 engine, it is designed to offer unparalleled speed, agility, and precision handling. Only a select few will ever experience the raw power and cutting-edge design of the Ferrari KC23.',
            categoryId10,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/2023_Ferrari_KC23_1.jpg/440px-2023_Ferrari_KC23_1.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Aston Martin Vantage',
            'The Aston Martin Vantage is a compact sports car that combines aggressive performance with sophisticated British design. With a potent 4.0-liter twin-turbocharged V8 engine, the Vantage offers blistering acceleration, precise handling, and an exhilarating exhaust note. Its bold, sculpted body lines are matched by a luxurious interior that blends modern technology with classic craftsmanship, making the Vantage a true drivers car.',
            categoryId11,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/2019_Aston_Martin_Vantage_V8_Automatic_4.0_%281%29.jpg/560px-2019_Aston_Martin_Vantage_V8_Automatic_4.0_%281%29.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Aston Martin DBX',
            'The Aston Martin DBX is the brands first luxury SUV, blending the performance and elegance of Aston Martin with the practicality and versatility of an SUV. Powered by a 4.0-liter twin-turbo V8 engine, the DBX offers breathtaking acceleration and handling characteristics typically reserved for sports cars. Inside, the DBX provides an exquisite cabin with top-tier materials, technology, and comfort, while maintaining Aston Martin’s renowned level of refinement and exclusivity.',
            categoryId11,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Aston-Martin_DBX_Prototype_%282019%29.jpg/560px-Aston-Martin_DBX_Prototype_%282019%29.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Aston Martin DB12',
            'The Aston Martin DB12 is the latest evolution of the brands iconic grand tourer lineage. With a 4.0-liter twin-turbo V8 engine, the DB12 combines blistering performance with unparalleled luxury. The refined interior features the finest materials, modern technology, and exceptional craftsmanship. On the road, the DB12 delivers a refined yet thrilling driving experience, striking the perfect balance between elegance and raw performance.',
            categoryId11,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Aston_Martin_DB12_1X7A1921.jpg/560px-Aston_Martin_DB12_1X7A1921.jpg'
        ]);
        await client.query(INSERT_CAR, [
            'Aston Martin Third generation',
            'The Third Generation of Aston Martin marks a bold new era for the iconic brand. Combining cutting-edge technology with a refined design philosophy, this generation of Aston Martin vehicles focuses on enhanced performance, sustainability, and bespoke customization options. Whether through advanced hybrid technologies, superior aerodynamics, or next-generation interior features, the Third Generation of Aston Martin vehicles aims to redefine luxury sports cars and continue the legacy of exceptional craftsmanship and driving pleasure.',
            categoryId11,
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Aston_Martin_Vanquish_%282024%29_Auto_Zuerich_2024_DSC_6828.jpg/560px-Aston_Martin_Vanquish_%282024%29_Auto_Zuerich_2024_DSC_6828.jpg'
        ]);


        console.log('Seeding completed!');
    } catch (e) {
        console.error('Error during seeding...', e);
        throw e;
    } finally {
        await client.end();
    }
}

main();