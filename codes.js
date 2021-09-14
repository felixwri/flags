const countries = {
    ad: { country: "Andorra", difficulty: 7 },
    ae: { country: "United Arab Emirates", difficulty: 6 },
    af: { country: "Afghanistan", difficulty: 5 },
    ag: { country: "Antigua and Barbuda", difficulty: 9, aliases: ["Antigua", "Barbuda"] },
    ai: { country: "Anguilla", difficulty: 10 },
    al: { country: "Albania", difficulty: 5 },
    am: { country: "Armenia", difficulty: 7 },
    ao: { country: "Angola", difficulty: 9 },
    aq: { country: "Antarctica", difficulty: 2 },
    ar: { country: "Argentina", difficulty: 4 },
    as: { country: "American Samoa", difficulty: 9 },
    at: { country: "Austria", difficulty: 4 },
    au: { country: "Australia", difficulty: 4 },
    aw: { country: "Aruba", difficulty: 10 },
    ax: { country: "Åland Islands", difficulty: 9 },
    az: { country: "Azerbaijan", difficulty: 5 },
    ba: { country: "Bosnia and Herzegovina", difficulty: 6 },
    bb: { country: "Barbados", difficulty: 9 },
    bd: { country: "Bangladesh", difficulty: 6 },
    be: { country: "Belgium", difficulty: 4 },
    bf: { country: "Burkina Faso", difficulty: 7 },
    bg: { country: "Bulgaria", difficulty: 4 },
    bh: { country: "Bahrain", difficulty: 9 },
    bi: { country: "Burundi", difficulty: 8 },
    bj: { country: "Benin", difficulty: 8 },
    bl: { country: "Saint Barthélemy", difficulty: 10 },
    bm: { country: "Bermuda", difficulty: 8 },
    bn: { country: "Brunei", difficulty: 9 },
    bo: { country: "Bolivia", difficulty: 5 },
    bq: { country: "Caribbean Netherlands", difficulty: 10 },
    br: { country: "Brazil", difficulty: 3 },
    bs: { country: "Bahamas", difficulty: 8 },
    bt: { country: "Bhutan", difficulty: 5 },
    bv: { country: "Bouvet Island", difficulty: 10 },
    bw: { country: "Botswana", difficulty: 6 },
    by: { country: "Belarus", difficulty: 7 },
    bz: { country: "Belize", difficulty: 8 },
    ca: { country: "Canada", difficulty: 1 },
    cc: { country: "Cocos (Keeling) Islands", difficulty: 10, aliases: ["Cocos Islands", "Keeling"] },
    cd: { country: "DR Congo", difficulty: 9 },
    cf: { country: "Central African Republic", difficulty: 5 },
    cg: { country: "Republic of the Congo", difficulty: 8 },
    ch: { country: "Switzerland", difficulty: 3 },
    ci: { country: "Côte d'Ivoire", difficulty: 9, aliases: ["Ivory coast"] },
    ck: { country: "Cook Islands", difficulty: 9 },
    cl: { country: "Chile", difficulty: 5 },
    cm: { country: "Cameroon", difficulty: 5 },
    cn: { country: "China", difficulty: 1 },
    co: { country: "Colombia", difficulty: 4 },
    cr: { country: "Costa Rica", difficulty: 5 },
    cu: { country: "Cuba", difficulty: 4 },
    cv: { country: "Cape Verde", difficulty: 8 },
    cw: { country: "Curaçao", difficulty: 10 },
    cx: { country: "Christmas Island", difficulty: 7 },
    cy: { country: "Cyprus", difficulty: 4 },
    cz: { country: "Czechia", difficulty: 4 },
    de: { country: "Germany", difficulty: 3 },
    dj: { country: "Djibouti", difficulty: 5 },
    dk: { country: "Denmark", difficulty: 5 },
    dm: { country: "Dominica", difficulty: 9 },
    do: { country: "Dominican Republic", difficulty: 7 },
    dz: { country: "Algeria", difficulty: 5 },
    ec: { country: "Ecuador", difficulty: 5 },
    ee: { country: "Estonia", difficulty: 6 },
    eg: { country: "Egypt", difficulty: 5 },
    eh: { country: "Western Sahara", difficulty: 8 },
    er: { country: "Eritrea", difficulty: 6 },
    es: { country: "Spain", difficulty: 2 },
    et: { country: "Ethiopia", difficulty: 5 },
    // eu: { country: "European Union", difficulty: 1 },
    fi: { country: "Finland", difficulty: 5 },
    fj: { country: "Fiji", difficulty: 7 },
    fk: { country: "Falkland Islands", difficulty: 9 },
    fm: { country: "Micronesia", difficulty: 7 },
    fo: { country: "Faroe Islands", difficulty: 8 },
    fr: { country: "France", difficulty: 1 },
    ga: { country: "Gabon", difficulty: 8 },
    gb: { country: "United Kingdom", difficulty: 1 },
    "gb-eng": { country: "England", difficulty: 2 },
    "gb-nir": { country: "Northern Ireland", difficulty: 8 },
    "gb-sct": { country: "Scotland", difficulty: 3 },
    "gb-wls": { country: "Wales", difficulty: 4 },
    gd: { country: "Grenada", difficulty: 8 },
    ge: { country: "Georgia", difficulty: 8 },
    gf: { country: "French Guiana", difficulty: 10 },
    gg: { country: "Guernsey", difficulty: 8 },
    gh: { country: "Ghana", difficulty: 6 },
    gi: { country: "Gibraltar", difficulty: 9 },
    gl: { country: "Greenland", difficulty: 6 },
    gm: { country: "Gambia", difficulty: 8 },
    gn: { country: "Guinea", difficulty: 8 },
    gp: { country: "Guadeloupe", difficulty: 10 },
    gq: { country: "Equatorial Guinea", difficulty: 10 },
    gr: { country: "Greece", difficulty: 3 },
    gs: { country: "South Georgia", difficulty: 10 },
    gt: { country: "Guatemala", difficulty: 9 },
    gu: { country: "Guam", difficulty: 7 },
    gw: { country: "Guinea-Bissau", difficulty: 10 },
    gy: { country: "Guyana", difficulty: 5 },
    hk: { country: "Hong Kong", difficulty: 4 },
    hm: { country: "Heard Island and McDonald Islands", difficulty: 10, aliases: ["Heard Island", "McDonald Islands"] },
    hn: { country: "Honduras", difficulty: 7 },
    hr: { country: "Croatia", difficulty: 5 },
    ht: { country: "Haiti", difficulty: 8 },
    hu: { country: "Hungary", difficulty: 4 },
    id: { country: "Indonesia", difficulty: 6 },
    ie: { country: "Ireland", difficulty: 4 },
    il: { country: "Israel", difficulty: 1 },
    im: { country: "Isle of Man", difficulty: 8 },
    in: { country: "India", difficulty: 2 },
    io: { country: "British Indian Ocean Territory", difficulty: 10, aliases: ["Indian Ocean Territory"] },
    iq: { country: "Iraq", difficulty: 7 },
    ir: { country: "Iran", difficulty: 6 },
    is: { country: "Iceland", difficulty: 5 },
    it: { country: "Italy", difficulty: 2 },
    je: { country: "Jersey", difficulty: 10 },
    jm: { country: "Jamaica", difficulty: 4 },
    jo: { country: "Jordan", difficulty: 8 },
    jp: { country: "Japan", difficulty: 1 },
    ke: { country: "Kenya", difficulty: 6 },
    kg: { country: "Kyrgyzstan", difficulty: 8 },
    kh: { country: "Cambodia", difficulty: 8 },
    ki: { country: "Kiribati", difficulty: 9 },
    km: { country: "Comoros", difficulty: 10 },
    kn: { country: "Saint Kitts and Nevis", difficulty: 10, aliases: ["Saint Kitts", "Nevis"] },
    kp: { country: "North Korea", difficulty: 4 },
    kr: { country: "South Korea", difficulty: 5 },
    kw: { country: "Kuwait", difficulty: 5 },
    ky: { country: "Cayman Islands", difficulty: 8 },
    kz: { country: "Kazakhstan", difficulty: 5 },
    la: { country: "Laos", difficulty: 9 },
    lb: { country: "Lebanon", difficulty: 7 },
    lc: { country: "Saint Lucia", difficulty: 9 },
    li: { country: "Liechtenstein", difficulty: 5 },
    lk: { country: "Sri Lanka", difficulty: 7 },
    lr: { country: "Liberia", difficulty: 5 },
    ls: { country: "Lesotho", difficulty: 8 },
    lt: { country: "Lithuania", difficulty: 5 },
    lu: { country: "Luxembourg", difficulty: 5 },
    lv: { country: "Latvia", difficulty: 6 },
    ly: { country: "Libya", difficulty: 6 },
    ma: { country: "Morocco", difficulty: 6 },
    mc: { country: "Monaco", difficulty: 7 },
    md: { country: "Moldova", difficulty: 5 },
    me: { country: "Montenegro", difficulty: 6 },
    mf: { country: "Saint Martin", difficulty: 10 },
    mg: { country: "Madagascar", difficulty: 7 },
    mh: { country: "Marshall Islands", difficulty: 8 },
    mk: { country: "North Macedonia", difficulty: 7 },
    ml: { country: "Mali", difficulty: 7 },
    mm: { country: "Myanmar", difficulty: 6 },
    mn: { country: "Mongolia", difficulty: 8 },
    mo: { country: "Macau", difficulty: 8 },
    mp: { country: "Northern Mariana Islands", difficulty: 8 },
    mq: { country: "Martinique", difficulty: 7 },
    mr: { country: "Mauritania", difficulty: 8 },
    ms: { country: "Montserrat", difficulty: 9 },
    mt: { country: "Malta", difficulty: 5 },
    mu: { country: "Mauritius", difficulty: 9 },
    mv: { country: "Maldives", difficulty: 9 },
    mw: { country: "Malawi", difficulty: 6 },
    mx: { country: "Mexico", difficulty: 4 },
    my: { country: "Malaysia", difficulty: 5 },
    mz: { country: "Mozambique", difficulty: 7 },
    na: { country: "Namibia", difficulty: 8 },
    nc: { country: "New Caledonia", difficulty: 9 },
    ne: { country: "Niger", difficulty: 7 },
    nf: { country: "Norfolk Island", difficulty: 10 },
    ng: { country: "Nigeria", difficulty: 7 },
    ni: { country: "Nicaragua", difficulty: 10 },
    nl: { country: "Netherlands", difficulty: 5 },
    no: { country: "Norway", difficulty: 5 },
    np: { country: "Nepal", difficulty: 4 },
    nr: { country: "Nauru", difficulty: 9 },
    nu: { country: "Niue", difficulty: 10 },
    nz: { country: "New Zealand", difficulty: 5 },
    om: { country: "Oman", difficulty: 8 },
    pa: { country: "Panama", difficulty: 6 },
    pe: { country: "Peru", difficulty: 7 },
    pf: { country: "French Polynesia", difficulty: 9 },
    pg: { country: "Papua New Guinea", difficulty: 7 },
    ph: { country: "Philippines", difficulty: 7 },
    pk: { country: "Pakistan", difficulty: 5 },
    pl: { country: "Poland", difficulty: 5 },
    pm: { country: "Saint Pierre and Miquelon", difficulty: 10, aliases: ["Saint Pierre", "Miquelon"] },
    pn: { country: "Pitcairn Islands", difficulty: 10 },
    pr: { country: "Puerto Rico", difficulty: 7 },
    ps: { country: "Palestine", difficulty: 6 },
    pt: { country: "Portugal", difficulty: 3 },
    pw: { country: "Palau", difficulty: 8 },
    py: { country: "Paraguay", difficulty: 5 },
    qa: { country: "Qatar", difficulty: 6 },
    re: { country: "Réunion", difficulty: 10 },
    ro: { country: "Romania", difficulty: 5 },
    rs: { country: "Serbia", difficulty: 4 },
    ru: { country: "Russia", difficulty: 3 },
    rw: { country: "Rwanda", difficulty: 8 },
    sa: { country: "Saudi Arabia", difficulty: 5 },
    sb: { country: "Solomon Islands", difficulty: 10 },
    sc: { country: "Seychelles", difficulty: 8 },
    sd: { country: "Sudan", difficulty: 7 },
    se: { country: "Sweden", difficulty: 3 },
    sg: { country: "Singapore", difficulty: 7 },
    sh: {
        country: "Saint Helena, Ascension and Tristan da Cunha",
        difficulty: 10,
        aliases: ["Saint Helena", "Ascension", "Tristan da Cunha"],
    },
    si: { country: "Slovenia", difficulty: 5 },
    sj: {
        country: "Svalbard and Jan Mayen",
        difficulty: 8,
        aliases: ["Svalbard", "Jan Mayen"],
    },
    sk: { country: "Slovakia", difficulty: 6 },
    sl: { country: "Sierra Leone", difficulty: 8 },
    sm: { country: "San Marino", difficulty: 7 },
    sn: { country: "Senegal", difficulty: 7 },
    so: { country: "Somalia", difficulty: 8 },
    sr: { country: "Suriname", difficulty: 9 },
    ss: { country: "South Sudan", difficulty: 8 },
    st: {
        country: "São Tomé and Príncipe",
        difficulty: 10,
        aliases: ["São Tomé", "Príncipe"],
    },
    sv: { country: "El Salvador", difficulty: 8 },
    sx: { country: "Sint Maarten", difficulty: 10 },
    sy: { country: "Syria", difficulty: 7 },
    sz: { country: "Eswatini (Swaziland)", difficulty: 7 },
    tc: { country: "Turks and Caicos Islands", difficulty: 10 },
    td: { country: "Chad", difficulty: 7 },
    tf: {
        country: "French Southern and Antarctic Lands",
        difficulty: 10,
        aliases: ["Antarctic Lands"],
    },
    tg: { country: "Togo", difficulty: 9 },
    th: { country: "Thailand", difficulty: 6 },
    tj: { country: "Tajikistan", difficulty: 8 },
    tk: { country: "Tokelau", difficulty: 10 },
    tl: { country: "Timor-Leste", difficulty: 9 },
    tm: { country: "Turkmenistan", difficulty: 8 },
    tn: { country: "Tunisia", difficulty: 7 },
    to: { country: "Tonga", difficulty: 7 },
    tr: { country: "Turkey", difficulty: 4 },
    tt: { country: "Trinidad and Tobago", difficulty: 10, aliases: ["Trinidad", "Tobago"] },
    tv: { country: "Tuvalu", difficulty: 8 },
    tw: { country: "Taiwan", difficulty: 6 },
    tz: { country: "Tanzania", difficulty: 8 },
    ua: { country: "Ukraine", difficulty: 5 },
    ug: { country: "Uganda", difficulty: 6 },
    // um: { country: "United States Minor Outlying Islands", difficulty: 10, aliases: ["United States"] },
    // un: { country: "United Nations", difficulty: 2 },
    us: {
        country: "United States",
        difficulty: 1,
        states: {
            "us-ak": "Alaska",
            "us-al": "Alabama",
            "us-ar": "Arkansas",
            "us-az": "Arizona",
            "us-ca": "California",
            "us-co": "Colorado",
            "us-ct": "Connecticut",
            "us-de": "Delaware",
            "us-fl": "Florida",
            "us-ga": "Georgia",
            "us-hi": "Hawaii",
            "us-ia": "Iowa",
            "us-id": "Idaho",
            "us-il": "Illinois",
            "us-in": "Indiana",
            "us-ks": "Kansas",
            "us-ky": "Kentucky",
            "us-la": "Louisiana",
            "us-ma": "Massachusetts",
            "us-md": "Maryland",
            "us-me": "Maine",
            "us-mi": "Michigan",
            "us-mn": "Minnesota",
            "us-mo": "Missouri",
            "us-ms": "Mississippi",
            "us-mt": "Montana",
            "us-nc": "North Carolina",
            "us-nd": "North Dakota",
            "us-ne": "Nebraska",
            "us-nh": "New Hampshire",
            "us-nj": "New Jersey",
            "us-nm": "New Mexico",
            "us-nv": "Nevada",
            "us-ny": "New York",
            "us-oh": "Ohio",
            "us-ok": "Oklahoma",
            "us-or": "Oregon",
            "us-pa": "Pennsylvania",
            "us-ri": "Rhode Island",
            "us-sc": "South Carolina",
            "us-sd": "South Dakota",
            "us-tn": "Tennessee",
            "us-tx": "Texas",
            "us-ut": "Utah",
            "us-va": "Virginia",
            "us-vt": "Vermont",
            "us-wa": "Washington",
            "us-wi": "Wisconsin",
            "us-wv": "West Virginia",
            "us-wy": "Wyoming",
        },
    },

    uy: { country: "Uruguay", difficulty: 6 },
    uz: { country: "Uzbekistan", difficulty: 7 },
    va: { country: "Vatican City (Holy See)", difficulty: 4, aliases: ["Vatican City", "Holy See"] },
    vc: { country: "Saint Vincent and the Grenadines", difficulty: 10, aliases: ["Saint Vincent", "the Grenadines"] },
    ve: { country: "Venezuela", difficulty: 5 },
    vg: { country: "British Virgin Islands", difficulty: 9 },
    vi: { country: "United States Virgin Islands", difficulty: 7 },
    vn: { country: "Vietnam", difficulty: 6 },
    vu: { country: "Vanuatu", difficulty: 9 },
    wf: { country: "Wallis and Futuna", difficulty: 10 },
    ws: { country: "Samoa", difficulty: 8 },
    xk: { country: "Kosovo", difficulty: 8 },
    ye: { country: "Yemen", difficulty: 7 },
    yt: { country: "Mayotte", difficulty: 9 },
    za: { country: "South Africa", difficulty: 5 },
    zm: { country: "Zambia", difficulty: 7 },
    zw: { country: "Zimbabwe", difficulty: 6 },
};
