// Each entry: the word to show, its photo, the photo's vertical focus (background-position y, %)
// and the largest font size it should use. The size is scaled down to fit narrow screens.
const CITY_SETS = {
    india: [
        { city: "MUMBAI", img: "img/india/1.webp", focus: 50, size: "19rem" },
        { city: "PATNA", img: "img/india/2.webp", focus: -30, size: "22rem" },
        { city: "कोलकाता", img: "img/india/3.webp", focus: 35, size: "16rem" },
        { city: "BHOPAL", img: "img/india/4.webp", focus: 80, size: "19rem" },
        { city: "लखनऊ", img: "img/india/5.webp", focus: 70, size: "19rem" },
        { city: "DELHI", img: "img/india/6.webp", focus: 30, size: "22rem" },
        { city: "KOTA", img: "img/india/7.webp", focus: 60, size: "22rem" },
        { city: "जामनगर", img: "img/india/8.webp", focus: 50, size: "19rem" },
        { city: "बेंगलुरु", img: "img/india/9.webp", focus: 10, size: "19rem" }
    ],
    marvel: [
        { city: "QUEENS", img: "img/marvel/14.webp", focus: 30, size: "20rem" },
        { city: "BROOKLYN", img: "img/marvel/15.webp", focus: 80, size: "16rem" },
        { city: "WAKANDA", img: "img/marvel/18.webp", focus: 14, size: "16rem" },
        { city: "ASGARD", img: "img/marvel/21.webp", focus: 10, size: "18rem" },
        { city: "DAYTON", img: "img/marvel/22.webp", focus: 50, size: "18rem" },
        { city: "NEW YORK", img: "img/marvel/25.webp", focus: 80, size: "16rem" },
        { city: "LONG ISLAND", img: "img/marvel/26.webp", focus: 26, size: "13rem" }
    ]
};
