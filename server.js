const { client, syncAndSeed } = require('./db');
const express = require('express');
const path = require('path');

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async(req, res, next)=> {

    try{
        const response = await client.query('SELECT * FROM "Continent";');     
        const continents = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel='stylesheet' href='/assets/styles.css' />
                </head>
                <body>
                    <h1>Places my mom has been :)</h1>
                    <h2>Continents</h2>
                    <ul>
                    ${
                        continents.map( continent => `
                        <li>
                            <a href='/brands/${continent.id}'>
                           ${ continent.name }
                           </a>
                        </li>    
                        `).join(' ')
                    }
                    </ul>
                </body>
            </html>
        
        `);
    }
    catch(ex){
        next(ex);
    }

});

app.get('/brands/:id', async(req, res, next)=> {

    try{
        //const brand = await client.query('SELECT * FROM "Brand" WHERE id=$1;', [req.params.id]);
        const response = await client.query('SELECT *, "Continent".name AS cname FROM "Continent" JOIN "Countries" ON "Continent".id = "Countries".continent_id Where "Continent".id = $1;', [req.params.id]);     
        const countries = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel='stylesheet' href='/assets/styles.css' />
                </head>
                <body>
                    <h1><a href='/'>Places my mom has been :)</a></h1>
                    <h2>${countries[0].cname}</h2>
                    <ul>
                    ${
                        countries.map( countrie => `
                        <li>
                           ${ countrie.name }
                        </li>    
                        `).join(' ')
                    }
                    </ul>
                </body>
            </html>
        
        `);
    }
    catch(ex){
        next(ex);
    }
    

});




const port = process.env.PORT || 3000;

const setUp = async()=>{
    try{
        await client.connect();
        await syncAndSeed();
        console.log("connected to database");
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    }
}

setUp();
