const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); // untuk menulis LOG

const port = process.env.PORT || 3000; // HEROKU ... env port for heroku || 3000 for locally

var hore = express();

hbs.registerPartials(__dirname + '/views/part-haha');

/**
 * create new middleware
 */
hore.use((req, res, lanjut) => {
    /// next... digunakan saat middleware selesai dijalankan
    var now = new Date().toString();
    //console.log(JSON.stringify(now));
    //console.log(`Klik pada : ${now}`);
    //console.log(`Method: ${req.method} dan URL: ${req.url}`);
    var Horelog = `Log: ${now} ~ ${req.method}  ~ ${req.url}`;
    console.log(Horelog);
    //fs.appendFile('server.log', Horelog + '\n'); // DEPRECATED... harus menggunakan callback
    /* fs.appendFile('server.log', Horelog + '\n', function(err){
        if (err) {
            console.log('Gagal mengirim ke log server');
        }
    }) */ /// biasa
    // using ES6.. arrow function
    fs.appendFile('server.log', Horelog+ '\n', (err)=> {
        if ( err ){
            console.log("Gagal maning bro... tulis log gagal!");
        }
    });
    lanjut(); // jika tanpa perintah next maka akan RELOAD tidak selesai2
});


// hore.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

/**
 * CREATE MIDDLEWARE 
 * -- bisa otomatis mengarah ke alamat HTML tersebut
 * -- membaca dari statis dir
 */
hore.use(express.static(__dirname + '/public'));  // MIDDLEWARE ...

/**
 * template engine
 */
hore.set('view engine', 'hbs');

/**
 * ini buat membantu... set value
 */
hbs.registerHelper('getTahun', () => {
    return new Date().getFullYear();
    // return 'asik';
});

hbs.registerHelper('tes', () => {
    return 'Halo Dunia'; 
});

/// MENGUBAH MENJADI UPPERCASE
hbs.registerHelper('IceCream', (text) => {
    return text.toUpperCase(); 
});

// 1. ngirim data HTML
hore.get('/', (request, response) => {
    //response.send('<h1>Halo dunia!</h1>');
    response.render('home.hbs', {
        title: 'Home Pages',
        body: 'main main asique'
        //tahun : new Date().getFullYear()
    });
});

//3.////////////////
hore.get('/about', (req, res) => {
    // res.send('About Pages');
    // render HBS
    // res.render('about'); /// bisa dengan hbs dan bisa tanpa hbs
    res.render('about.hbs', {
        title : 'About Page',
        //tahun : new Date().getFullYear(),
        data : 'asik'
    });
});

hore.get('/projects', (minta, terima) => {
    terima.render('projects.hbs', {
        title: "Project Terbaru"
    });
});

hore.get('/feature', (req, res) => {
    res.render('feature.hbs', {
        title: "Halaman FITUR BRO"
    })
});

// 2. ngirim data JSON
hore.get('/json', (req, res) => {
    res.send({
        nama: "Paijo",
        likes: [
            'Madang',
            'Turu',
            'Hore'
        ]
    });
});



// //// BAD    --- send back JSON dengan pesanError
hore.get('/bad', (req, res) => {
    res.send({
        err_msg : 'tidak ada API yang tersedia'
    });
});

// BAD number 2
hore.get('/bad2', (req, res) => {
    res.json({
        err_msg : 'oke bro',
        data: [
            'bebek',
            'ayam',
            'burung'
        ],
        hore: {
            nama: 'asik',
            umur: 21
        }

    });
});




// HELP PAGE
hore.get('/help', (req, res) => {
    res.sendFile(__dirname+ '/public/help.html'); // kirim ke halaman HTML
});

// LISTENING SERVER IN PORT 3000
// app.listen(3000, function(){
//     console.log("Server berjalan pada port 3000");
// }); 
//////// new arrow function
//var port = 3000;
hore.listen(port, () => {
    console.log(`Server is running in port ${port}, Thank you`);
});

/***
 * Perintah untuk restart otomatis,,, jika terdapat perubahan pada format js dan hbs
 * >>> nodemon app.js -e js,hbs
 * --------------------------------//
 */

/**
 * LEARN ABOUT GIT
 * ===============
 * 1. --- git init
 * 2. --- git status
 * 3. --- git add [nama_file/folder]
 *      --- node_modules, server.log,,, --- TIDAK USAH DIMASUKAN
 * 4. buat file .gitignore --> untuk mendefinisikan folder / file yang tidak di track
 *  5. perintah commit 
 *      --- git commit -m "inisial commit hore"
 *      --- -m singkatan dari message
 *  6.  --- git rm app.js -f :: --- menghapus file
 *      --- git rm app.js --cached    ::: hanya menghapus dari 'changes to be commited'
 */

 /**
  * GENERATING NEW SSH KEY
  * $  ssh-keygen -t rsa -b 4096 -C 'email@gmail.com'
  * CEK AGENT SSH
  * $  eval $(ssh-agent -s)
  * ---------------
  * CEK SSH ada atau tidak
  * $  ls -al ~/.ssh
  * -----------------
  * CEK SUDAH TERHUBUNG DENGAN GITHUB ATAU BELUM
  * $ ssh -T git@github.com
  */


/**
 * ABOUT HEROKU
 * ============
 * $ heroku --version
 * $ heroku --help
 * $ heroku login
 * $ heroku keys:add
 * $ heroku keys ---- menampilkan ssh-rsa ... dan email
 * $ heroku keys:remove    --- to REMOVE
 * $ ssh -v git@heroku.com ---- to authenticate to HEROKU ... (harus dengan git bash)
 * 
 */

/**
 * Git to Heroku
 * =============
 * $ git push .... saja bisa... artinya ya bisa ke semua
 * $$$$$$ origin ditujukan ke remote utama,,, misal github
 * $$$$$$ cara cek dengan perintah
 * $ git remote -v  ---- melihat semua daftar git push
 * $ heroku create    ----- perintah membuat aplikasi
 * $ git push heroku   ----- perintah mengunggah heroku app from lokal
 * $ heroku open
 */