import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Modal, Button, Form } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { useState, useEffect } from "react";
import { calculateRange, sliceData } from '../../src/utils/table-pagination';
import axios from "axios";


const CarListing = () => {
  const [Cars, setCars] = useState([]);
  const [AllCars, setAllCars] = useState([]);
  const [Srch, setSrch] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState([]);
  const [show, setShow] = useState(false);
  const [mk, setMk] = useState(String);
  const [mod, setmod] = useState(String);
  const [typ, settyp] = useState(String);
  const [str, setstr] = useState(String);
  const [fl, setfl] = useState(String);
  const [col, setcol] = useState(String);
  const [sts, setsts] = useState(String);
  const [loc, setloc] = useState(String);
  const [wd, setwd] = useState(String);
  const [transmssn, settransmssn] = useState(String);
  const [minYr, setminYr] = useState("0");
  const [maxYr, setmaxYr] = useState("2024");
  const [minEng, setminEng] = useState("0");
  const [maxEng, setmaxEng] = useState("10000");
  const [minMile, setminMile] = useState("0");
  const [maxMile, setmaxMile] = useState("1000000");

  var time = new Date()
  var year = time.getFullYear
  const handleShow = () => {
    setShow(!show)
  }
  const advSearch = () => {
    console.log(mk, mod, typ, str, fl, col, sts, loc, wd, transmssn, minYr, maxYr, minEng, maxEng)
    const search_result = copyCars.filter((item) =>
      item.maker.toString().toLowerCase().includes(mk.toString().toLowerCase()) &&
      item.type.toString().toLowerCase().includes(typ.toString().toLowerCase()) &&
      item.model.toString().toLowerCase().includes(mod.toString().toLowerCase()) &&
      item.fuel.toString().toLowerCase().includes(fl.toString().toLowerCase()) &&
      item.steering.toString().toLowerCase().includes(str.toString().toLowerCase()) &&
      item.seats.toString().toLowerCase().includes(sts.toString().toLowerCase()) &&
      item.wheelDrive.toString().toLowerCase().includes(wd.toString().toLowerCase()) &&
      item.color.toString().toLowerCase().includes(col.toString().toLowerCase()) &&
      // (parseInt(item.manufacturingYear.toString().toLowerCase()) >= parseInt(minYr.toString().toLowerCase()) &&
      //   parseInt(item.manufacturingYear.toString().toLowerCase()) <= parseInt(maxYr.toString().toLowerCase())) &&
      // (parseInt(item.engineSize.toString().toLowerCase()) >= parseInt(minEng.toString().toLowerCase()) &&
      //   parseInt(item.engineSize.toString().toLowerCase()) <= parseInt(maxEng.toString().toLowerCase())) &&
      // (parseInt(item.mileage.toString().toLowerCase()) >= parseInt(minMile.toString().toLowerCase()) &&
      //   parseInt(item.mileage.toString().toLowerCase()) <= parseInt(maxMile.toString().toLowerCase())) &&
      item.transmission.toString().toLowerCase().includes(transmssn.toString().toLowerCase()) &&
      item.location.toString().toLowerCase().includes(loc.toString().toLowerCase())
    );
    copyCars = search_result;
    setCars(copyCars);
    handleShow();
  }
  const clear = () => {
    setMk("")
    settyp("")
    setmod("")
    setfl("")
    setstr("")
    setsts("")
    setwd("")
    setcol("")
    settransmssn("")
    setloc("")
    setminYr("0")
    setmaxYr("2024")
    setminEng("0")
    setmaxEng("10000")
    setminMile("0")
    setmaxMile("1000000")
    __handleChangePage(page);
    handleShow();
  }

  useEffect(() => {
    axios.get("http://localhost:3000/cars")
      .then(res => {
        setSrch(res.data.cars.sort((a, b) => parseInt(b.carid) - parseInt(a.carid)));
        setPagination(calculateRange(res.data.cars.sort((a, b) => parseInt(b.carid) - parseInt(a.carid)), 16));
        setAllCars(res.data.cars.sort((a, b) => parseInt(b.carid) - parseInt(a.carid)));

        setCars(sliceData(res.data.cars.sort((a, b) => parseInt(b.carid) - parseInt(a.carid)), page, 16));
        console.log(Srch)
        //setCars(res.data.cars)
      })
  }, []
  )
  var copyCars = [...AllCars]

  function onSelectionChange(e) {
    const sortDirection = e.target.value;
    const copyArray = [...Cars]; // create a new array & not mutate state

    copyArray.sort((a, b) => {
      return sortDirection === "" ? parseInt(b.carid) - parseInt(a.carid) :
        sortDirection === "1" ?
          a.price - b.price : sortDirection === "2" ? b.price - a.price : null;
    });
    setCars(copyArray);
  }

  function onMaker(e) {

    const maker = e.target.value
    setMk(maker);
    console.log(mk)

  }
  function onType(e) {

    const type = e.target.value
    console.log(Srch)
    settyp(type)

  }
  function onModel(e) {

    const model = e.target.value
    setmod(model)

  }
  function onFuel(e) {
    const fuel = e.target.value
    setfl(fuel)

  }
  function onSteer(e) {
    const steering = e.target.value
    setstr(steering)

  }
  function onSeats(e) {
    const seats = e.target.value
    setsts(seats)

  }
  function onWD(e) {
    const WD = e.target.value
    setwd(WD)

  }
  function onColor(e) {
    const color = e.target.value
    setcol(color)

  }
  function onloc(e) {
    const location = e.target.value
    setloc(location)

  }
  function onTransmsn(e) {
    const transmission = e.target.value
    settransmssn(transmission)

  }
  function onMinYr(e) {
    const minYr = e.target.value
    setminYr(minYr)
  }
  function onMaxYr(e) {
    const maxYr = e.target.value
    setmaxYr(maxYr)
  }
  function onMinEng(e) {
    const minEng = e.target.value
    setminEng(minEng)
  }
  function onMaxEng(e) {
    const maxEng = e.target.value
    setmaxEng(maxEng)
  }
  function onMinMile(e) {
    const minMile = e.target.value
    setminMile(minMile)
  }
  function onMaxMile(e) {
    const maxMile = e.target.value
    setmaxMile(maxMile)
  }


  const __handleChangePage = (new_page) => {
    setPage(new_page);
    axios.get("http://localhost:3000/cars")
      .then(res => {
        setCars(sliceData(res.data.cars.sort((a, b) => parseInt(b.carid) - parseInt(a.carid)), new_page, 16));
        window.scrollTo(0, 0);
        console.log("checking.....")
      })
  }

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') {
      const search_results = copyCars.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.maker.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.model.toLowerCase().includes(search.toLowerCase()) ||
        item.engineCode.toLowerCase().includes(search.toLowerCase()) ||
        item.engineSize.toLowerCase().includes(search.toLowerCase()) ||
        item.mileage.toLowerCase().includes(search.toLowerCase()) ||
        item.color.toLowerCase().includes(search.toLowerCase()) ||
        item.wheelDrive.toLowerCase().includes(search.toLowerCase()) ||
        item.transmission.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.steering.toLowerCase().includes(search.toLowerCase()) ||
        item.fuel.toLowerCase().includes(search.toLowerCase()) ||
        item.weight.toLowerCase().includes(search.toLowerCase()) ||
        item.registrationYear.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.manufacturingYear.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.doors.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.seats.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.totalPrice.toString().toLowerCase().includes(search.toLowerCase())
      );
      setCars(search_results);
    }
    else {
      __handleChangePage(page);
    }
  };


  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Modal show={show}>
            <Modal.Header closeButton onClick={handleShow}>
              <Modal.Title className=" font-sans font-bold text-blue-700">Advanced search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div className=" text-xl flex justify-between"><div>Maker:</div> <select className="" defaultValue={mk} onChange={onMaker}>
                  <option value={""}>All</option>
                  <option value={"Toyota"}>Toyota</option>
                  <option value={"Nissan"}>Nissan</option>
                  <option value={"Honda"}>Honda</option>
                  <option value={"Mazda"}>Mazda</option>
                  <option value={"Mitsubishi"}>Mitsubishi</option>
                  <option value={"Subaru"}>Subaru</option>
                  <option value={"Suzuki"}>Suzuki</option>
                  <option value={"Isuzu"}>Isuzu</option>
                  <option value={"Lexus"}>Lexus</option>
                  <option value={"Mercedes-Benz"}>Mercedes-Benz</option>
                  <option value={"BMW"}>Bmw</option>
                  <option value={"Volkswagen"}>Volkswagen</option>
                  <option value={"Audi"}>Audi</option>
                  <option value={"Ford"}>Ford</option>
                  <option value={"Volvo"}>Volvo</option>
                  <option value={"Land Rover"}>Land Rover</option>
                  <option value={"Jeep"}>Jeep</option>
                  <option value={"Hyundai"}>Hyundai</option>
                  <option value={"KIA"}>KIA</option>
                  <option value={"Chevrolet"}>Chevrolet</option>
                  <option value={"Honda"}>Honda</option>
                  <option value={"Porsche"}>Porsche</option>
                  <option value={"Lamborghini"}>Lamborghini</option>
                  <option value={"Ferrari"}>Ferrari</option>
                </select></div>
                <div className=" text-xl flex justify-between"><div>Type:</div> <select className="" defaultValue={typ} onChange={onType}>
                  <option value={""}>All</option>
                  <option value={"SUV"}>SUV</option>
                  <option value={"Truck"}>Truck</option>
                  <option value={"Van"}>Van</option>
                  <option value={"Sedan"}>Sedan</option>
                  <option value={"Bus"}>Bus</option>
                  <option value={"Mini Van"}>Min Van</option>
                  <option value={"Hatchback"}>Hatchback</option>
                  <option value={"Coupe"}>Coupe</option>
                  <option value={"Convertible"}>Convertible</option>
                  <option value={"Wagon"}>Wagon</option>
                  <option value={"Mini Bus"}>Mini Bus</option>
                  <option value={"Pick up"}>Pick up</option>
                  <option value={"Tractor"}>Tractor</option>
                </select></div>
                <div className=" text-xl flex justify-between"><div>Model:</div> <select className="" defaultValue={mod} onChange={onModel}>
                  <option value={""}>All</option>
                  <option value="1 SERIES">1 SERIES </option>
                  <option value="1007">1007 </option>
                  <option value="106">106 </option>
                  <option value="114">114 </option>
                  <option value="117 COUPE">117 COUPE </option>
                  <option value="124">124 </option>
                  <option value="147">147 </option>
                  <option value="1500">1500 </option>
                  <option value="155">155 </option>
                  <option value="156">156 </option>
                  <option value="156 SPORTWAGON ">156 SPORTWAGON </option>
                  <option value="190 CLASS">190 CLASS </option>
                  <option value="2 SERIES">2 SERIES </option>
                  <option value="2008">2008 </option>
                  <option value="206">206 </option>
                  <option value="975">207 (78)</option>
                  <option value="13842">208 (138)</option>
                  <option value="868">240 (31)</option>
                  <option value="16441">250 (1)</option>
                  <option value="1704">2CV (1)</option>
                  <option value="1033">3 SERIES (2,802)</option>
                  <option value="1034">3 SERIES CABRIORET (3)</option>
                  <option value="1469">300 (34)</option>
                  <option value="14329">3008 (775)</option>
                  <option value="791">300C (130)</option>
                  <option value="16438">300D (1)</option>
                  <option value="976">306 (2)</option>
                  <option value="977">307 (19)</option>
                  <option value="1727">308 (110)</option>
                  <option value="2561">3200GT (2)</option>
                  <option value="1079">348 (2)</option>
                  <option value="1081">360 MODENA (5)</option>
                  <option value="16360">3848KI (1)</option>
                  <option value="13551">4 SERIES (293)</option>
                  <option value="16416">4007 (5)</option>
                  <option value="979">406 (3)</option>
                  <option value="980">407 (10)</option>
                  <option value="1787">430 SCUDERIA (3)</option>
                  <option value="16183">440 E42 (1)</option>
                  <option value="1083">456M (1)</option>
                  <option value="13285">4RUNNER (115)</option>
                  <option value="1035">5 SERIES (2,537)</option>
                  <option value="1194">500 (553)</option>
                  <option value="13860">5008 (284)</option>
                  <option value="13879">508 (52)</option>
                  <option value="1085">512TR (1)</option>
                  <option value="1088">599 (7)</option>
                  <option value="1036">6 SERIES (132)</option>
                  <option value="1037">7 SERIES (160)</option>
                  <option value="16141">700 SERIES (1)</option>
                  <option value="869">740 760 (1)</option>
                  <option value="831">75 (1)</option>
                  <option value="2558">75 (1)</option>
                  <option value="1038">8 SERIES (38)</option>
                  <option value="747">80 (2)</option>
                  <option value="870">850 (1)</option>
                  <option value="13356">850 ESTATE (5)</option>
                  <option value="13367">86 (556)</option>
                  <option value="726">9-3 SERIES (9)</option>
                  <option value="727">9-5 SERIES (3)</option>
                  <option value="729">900 (1)</option>
                  <option value="860">911 (249)</option>
                  <option value="871">940 (1)</option>
                  <option value="13398">940 ESTATE (19)</option>
                  <option value="862">944 (2)</option>
                  <option value="13276">960 (5)</option>
                  <option value="1101">A-CLASS (316)</option>
                  <option value="13389">A1 (152)</option>
                  <option value="748">A3 (338)</option>
                  <option value="16069">A3 SEDAN (57)</option>
                  <option value="749">A4 (620)</option>
                  <option value="15941">A4 ALLROAD QUATTRO (12)</option>
                  <option value="1639">A5 (357)</option>
                  <option value="750">A6 (610)</option>
                  <option value="751">A6 ALLROAD QUATTRO (10)</option>
                  <option value="15700">A7 (155)</option>
                  <option value="752">A8 (47)</option>
                  <option value="2487">ABARTH OTHERS (25)</option>
                  <option value="1965">ACADIA (47)</option>
                  <option value="732">ACCENT (122)</option>
                  <option value="284">ACCORD (336)</option>
                  <option value="285">ACCORD COUPE (4)</option>
                  <option value="13823">ACCORD HYBRID (44)</option>
                  <option value="1291">ACCORD TOURER (37)</option>
                  <option value="286">ACCORD WAGON (22)</option>
                  <option value="16199">ACTROS (120)</option>
                  <option value="287">ACTY (15)</option>
                  <option value="288">ACTY TRUCK (254)</option>
                  <option value="1292">ACTY VAN (190)</option>
                  <option value="2079">ACTYON (53)</option>
                  <option value="13239">AD EXPERT (17)</option>
                  <option value="354">AD VAN (183)</option>
                  <option value="615">AERIO (1)</option>
                  <option value="13245">AERIO SEDAN (1)</option>
                  <option value="13279">AERO BUS (1)</option>
                  <option value="1307">AERO MIDI (2)</option>
                  <option value="15683">AERO QUEEN (1)</option>
                  <option value="13483">AERO SPACE (2)</option>
                  <option value="14176">AERO STAR (2)</option>
                  <option value="13269">AERO TOWN (7)</option>
                  <option value="13507">AIRMAN OTHERS (1)</option>
                  <option value="533">AIRTREK (10)</option>
                  <option value="289">AIRWAVE (34)</option>
                  <option value="1051">ALCYONE SVX (26)</option>
                  <option value="1152">ALFA ROMEO OTHERS (14)</option>
                  <option value="100">ALLEX (9)</option>
                  <option value="101">ALLION (113)</option>
                  <option value="753">ALLROAD QUATTRO (2)</option>
                  <option value="1252">ALMERA (1)</option>
                  <option value="102">ALPHARD (1,309)</option>
                  <option value="103">ALPHARD HYBRID (168)</option>
                  <option value="105">ALTEZZA (95)</option>
                  <option value="106">ALTEZZA GITA (14)</option>
                  <option value="1253">ALTIMA (91)</option>
                  <option value="682">ALTIS (2)</option>
                  <option value="616">ALTO (1,866)</option>
                  <option value="617">ALTO WORKS (269)</option>
                  <option value="16088">AMAROK (220)</option>
                  <option value="16467">AMG GT (7)</option>
                  <option value="1000">AMG OTHERS (1)</option>
                  <option value="1407">APPLAUSE (1)</option>
                  <option value="13235">AQUA (1,771)</option>
                  <option value="107">ARISTO (112)</option>
                  <option value="1254">ARMADA (6)</option>
                  <option value="1123">ARNAGE (3)</option>
                  <option value="656">ASKA (1)</option>
                  <option value="1471">ASPEN (1)</option>
                  <option value="534">ASPIRE (1)</option>
                  <option value="1578">ASTON MARTIN OTHERS (4)</option>
                  <option value="850">ASTRA (3)</option>
                  <option value="851">ASTRA WAGON (1)</option>
                  <option value="920">ASTRO (29)</option>
                  <option value="16200">ATEGO (1)</option>
                  <option value="475">ATENZA (164)</option>
                  <option value="13001">ATENZA SPORT (40)</option>
                  <option value="13003">ATENZA SPORT WAGON (35)</option>
                  <option value="13865">ATENZA WAGON (220)</option>
                  <option value="356">ATLAS (189)</option>
                  <option value="357">ATLAS LOCO (1)</option>
                  <option value="683">ATRAI (157)</option>
                  <option value="684">ATRAI 7 (8)</option>
                  <option value="685">ATRAI WAGON (504)</option>
                  <option value="754">AUDI OTHERS (7)</option>
                  <option value="108">AURIS (144)</option>
                  <option value="921">AVALANCHE (3)</option>
                  <option value="1924">AVANTE (ELANTRA) (1,312)</option>
                  <option value="2633">AVENGER (2)</option>
                  <option value="358">AVENIR (3)</option>
                  <option value="110">AVENSIS (49)</option>
                  <option value="13227">AVENSIS WAGON (7)</option>
                  <option value="922">AVEO (3)</option>
                  <option value="476">AXELA (99)</option>
                  <option value="14405">AXELA HYBRID (8)</option>
                  <option value="13002">AXELA SPORT (376)</option>
                  <option value="16201">AXOR (9)</option>
                  <option value="477">AZ-1 (18)</option>
                  <option value="478">AZ-3 (1)</option>
                  <option value="479">AZ-OFFROAD (52)</option>
                  <option value="480">AZ-WAGON (438)</option>
                  <option value="1102">B-CLASS (340)</option>
                  <option value="1623">B10 (1)</option>
                  <option value="16080">B2500 (2)</option>
                  <option value="1626">B3 (9)</option>
                  <option value="13554">B4 (2)</option>
                  <option value="1631">B6 (3)</option>
                  <option value="1394">BALENO (15)</option>
                  <option value="1195">BARCHETTA (3)</option>
                  <option value="111">BB (420)</option>
                  <option value="362">BE-1 (14)</option>
                  <option value="686">BE-GO (5)</option>
                  <option value="292">BEAT (88)</option>
                  <option value="768">BEETLE (30)</option>
                  <option value="657">BELLET (1)</option>
                  <option value="112">BELTA (50)</option>
                  <option value="16395">BENTAYGA (144)</option>
                  <option value="1134">BENTLEY OTHERS (13)</option>
                  <option value="2540">BERLINGO (3)</option>
                  <option value="16349">BH090 (7)</option>
                  <option value="1358">BIANTE (219)</option>
                  <option value="1256">BIG THUMB (20)</option>
                  <option value="658">BIGHORN (21)</option>
                  <option value="113">BLADE (35)</option>
                  <option value="924">BLAZER (6)</option>
                  <option value="1211">BLIZZARD (1)</option>
                  <option value="13876">BLUE RIBBON (1)</option>
                  <option value="363">BLUEBIRD (15)</option>
                  <option value="364">BLUEBIRD SYLPHY (50)</option>
                  <option value="1636">BMW ALPINA OTHERS (3)</option>
                  <option value="1049">BMW OTHERS (41)</option>
                  <option value="1831">BONGO (6)</option>
                  <option value="16459">BONGO 3 (1,432)</option>
                  <option value="16461">BONGO 3 COACH (1)</option>
                  <option value="481">BONGO BRAWNY TRUCK (5)</option>
                  <option value="482">BONGO BRAWNY VAN (12)</option>
                  <option value="1359">BONGO BRAWNY WAGON (1)</option>
                  <option value="483">BONGO FRIENDEE (21)</option>
                  <option value="484">BONGO TRUCK (179)</option>
                  <option value="485">BONGO VAN (208)</option>
                  <option value="486">BONGO WAGON (1)</option>
                  <option value="687">BOON (77)</option>
                  <option value="13282">BOON LUMINAS (3)</option>
                  <option value="769">BORA (3)</option>
                  <option value="864">BOXSTER (149)</option>
                  <option value="535">BRAVO (3)</option>
                  <option value="1146">BRERA (16)</option>
                  <option value="114">BREVIS (11)</option>
                  <option value="13368">BRZ (205)</option>
                  <option value="16328">BS106 (7)</option>
                  <option value="16081">BT-50 (36)</option>
                  <option value="1103">C-CLASS (1,894)</option>
                  <option value="2533">C-CLASS (2)</option>
                  <option value="13850">C-HR (288)</option>
                  <option value="1708">C3 (103)</option>
                  <option value="1709">C3 PLURIEL (1)</option>
                  <option value="872">C30 (12)</option>
                  <option value="1710">C4 (18)</option>
                  <option value="1711">C4 PICASSO (19)</option>
                  <option value="1712">C5 (10)</option>
                  <option value="1713">C6 (15)</option>
                  <option value="873">C70 (23)</option>
                  <option value="1694">CAB CHASIS (1)</option>
                  <option value="13318">CABRIO (3)</option>
                  <option value="755">CABRIOLET (2)</option>
                  <option value="13277">CABSTAR (19)</option>
                  <option value="1031">CADILLAC OTHERS (48)</option>
                  <option value="115">CALDINA (29)</option>
                  <option value="2201">CALIBER (5)</option>
                  <option value="852">CALIBRA (1)</option>
                  <option value="928">CAMARO (98)</option>
                  <option value="117">CAMI (8)</option>
                  <option value="16125">CAMROAD (11)</option>
                  <option value="118">CAMRY (423)</option>
                  <option value="119">CAMRY GRACIA (1)</option>
                  <option value="13390">CAMRY HYBRID (5)</option>
                  <option value="536">CANTER (1,300)</option>
                  <option value="2604">CANTER (26)</option>
                  <option value="1308">CANTER GUTS (103)</option>
                  <option value="2605">CANTER GUTS (3)</option>
                  <option value="1967">CANYON (5)</option>
                  <option value="293">CAPA (2)</option>
                  <option value="487">CAPELLA (1)</option>
                  <option value="488">CAPELLA WAGON (1)</option>
                  <option value="618">CAPPUCCINO (63)</option>
                  <option value="2152">CAPTIVA (176)</option>
                  <option value="16418">CAPTUR (2)</option>
                  <option value="619">CARA (2)</option>
                  <option value="366">CARAVAN BUS (18)</option>
                  <option value="367">CARAVAN COACH (50)</option>
                  <option value="368">CARAVAN ELGRAND (3)</option>
                  <option value="369">CARAVAN VAN (305)</option>
                  <option value="15606">CARAVAN WAGON (3)</option>
                  <option value="1663">CARAVELLE (1)</option>
                  <option value="1835">CARENS (2)</option>
                  <option value="16327">CARGO (4)</option>
                  <option value="120">CARINA (28)</option>
                  <option value="121">CARINA ED (4)</option>
                  <option value="1836">CARNIVAL (156)</option>
                  <option value="490">CAROL (241)</option>
                  <option value="620">CARRY TRUCK (1,148)</option>
                  <option value="621">CARRY VAN (5)</option>
                  <option value="16089">CASE OTHERS (4)</option>
                  <option value="15627">CAST (489)</option>
                  <option value="2104">CAT OTHERS (1)</option>
                  <option value="2449">CATERPILLAR OTHERS (6)</option>
                  <option value="122">CAVALIER (1)</option>
                  <option value="865">CAYENNE (256)</option>
                  <option value="866">CAYMAN (109)</option>
                  <option value="14429">CC (27)</option>
                  <option value="1259">CEDRIC CIMA (2)</option>
                  <option value="371">CEDRIC SEDAN (86)</option>
                  <option value="372">CEDRIC VAN (1)</option>
                  <option value="373">CEDRIC WAGON (9)</option>
                  <option value="374">CEFIRO (9)</option>
                  <option value="375">CEFIRO WAGON (1)</option>
                  <option value="123">CELICA (153)</option>
                  <option value="125">CELSIOR (229)</option>
                  <option value="126">CENTURY (52)</option>
                  <option value="1839">CERATO (1)</option>
                  <option value="622">CERVO (144)</option>
                  <option value="623">CERVO MODE (12)</option>
                  <option value="13867">CF (20)</option>
                  <option value="16166">CF65 (3)</option>
                  <option value="16167">CF75 (7)</option>
                  <option value="16168">CF85 (8)</option>
                  <option value="538">CHALLENGER (3)</option>
                  <option value="2635">CHALLENGER (20)</option>
                  <option value="688">CHARADE (4)</option>
                  <option value="2636">CHARGER (30)</option>
                  <option value="539">CHARIOT (2)</option>
                  <option value="540">CHARIOT GRANDIS (3)</option>
                  <option value="127">CHASER (103)</option>
                  <option value="1159">CHEROKEE (414)</option>
                  <option value="970">CHEVROLET OTHERS (1)</option>
                  <option value="2154">CHEVY (1)</option>
                  <option value="802">CHRYSLER OTHERS (1)</option>
                  <option value="376">CIMA (139)</option>
                  <option value="15673">CIMA HYBRID (3)</option>
                  <option value="1760">CINQUECENTRO (1)</option>
                  <option value="1136">CITROEN OTHERS (17)</option>
                  <option value="294">CITY (11)</option>
                  <option value="295">CIVIC (324)</option>
                  <option value="296">CIVIC COUPE (4)</option>
                  <option value="297">CIVIC FERIO (34)</option>
                  <option value="298">CIVIC HYBRID (22)</option>
                  <option value="299">CIVIC SHUTTLE (1)</option>
                  <option value="300">CIVIC TYPE R (30)</option>
                  <option value="377">CIVILIAN BUS (60)</option>
                  <option value="1104">CL-CLASS (26)</option>
                  <option value="13587">CLA-CLASS (387)</option>
                  <option value="1738">CLIO (1)</option>
                  <option value="378">CLIPPER (165)</option>
                  <option value="379">CLIPPER RIO (163)</option>
                  <option value="380">CLIPPER TRUCK (246)</option>
                  <option value="381">CLIPPER VAN (422)</option>
                  <option value="1105">CLK-CLASS (23)</option>
                  <option value="1106">CLS-CLASS (249)</option>
                  <option value="129">COASTER (120)</option>
                  <option value="936">COLORADO (40)</option>
                  <option value="541">COLT (95)</option>
                  <option value="543">COLTPLUS (28)</option>
                  <option value="131">COMFORT (1)</option>
                  <option value="1163">COMMANDER (11)</option>
                  <option value="660">COMO (13)</option>
                  <option value="1164">COMPASS (205)</option>
                  <option value="2147">CONCOURS (5)</option>
                  <option value="382">CONDOR (113)</option>
                  <option value="16071">CONDOR (37)</option>
                  <option value="1126">CONTINENTAL (26)</option>
                  <option value="1606">CONTINENTAL FLYING SPUR (7)</option>
                  <option value="1607">CONTINENTAL GT (3)</option>
                  <option value="1608">CONTINENTAL GTC (2)</option>
                  <option value="689">COO (6)</option>
                  <option value="2242">COOPER (25)</option>
                  <option value="690">COPEN (710)</option>
                  <option value="13848">COROLLA (139)</option>
                  <option value="1215">COROLLA ALTIS (30)</option>
                  <option value="132">COROLLA AXIO (148)</option>
                  <option value="16487">COROLLA CROSS (51)</option>
                  <option value="134">COROLLA FIELDER (336)</option>
                  <option value="137">COROLLA LEVIN (40)</option>
                  <option value="138">COROLLA RUMION (153)</option>
                  <option value="139">COROLLA RUNX (23)</option>
                  <option value="140">COROLLA SEDAN (14)</option>
                  <option value="141">COROLLA SPACIO (22)</option>
                  <option value="16466">COROLLA SPORT (2)</option>
                  <option value="142">COROLLA TOURING WAGON (102)</option>
                  <option value="143">COROLLA VAN (1)</option>
                  <option value="144">COROLLA WAGON (2)</option>
                  <option value="145">CORONA (8)</option>
                  <option value="146">CORONA EXIV (2)</option>
                  <option value="147">CORONA PREMIO (11)</option>
                  <option value="770">CORRADO (1)</option>
                  <option value="149">CORSA (5)</option>
                  <option value="938">CORVETTE (31)</option>
                  <option value="1363">COSMO (3)</option>
                  <option value="2651">COUGAR (1)</option>
                  <option value="1928">COUNTY (19)</option>
                  <option value="1197">COUPE (2)</option>
                  <option value="2562">COUPE (2)</option>
                  <option value="2579">COUPE (1)</option>
                  <option value="13257">COUPE (14)</option>
                  <option value="303">CR-V (154)</option>
                  <option value="304">CR-X (17)</option>
                  <option value="305">CR-X DELSOL (6)</option>
                  <option value="13294">CR-Z (214)</option>
                  <option value="150">CRESTA (42)</option>
                  <option value="383">CREW (2)</option>
                  <option value="874">CROSS COUNTRY (7)</option>
                  <option value="13322">CROSS GOLF (2)</option>
                  <option value="771">CROSS POLO (7)</option>
                  <option value="794">CROSSFIRE (13)</option>
                  <option value="302">CROSSROAD (156)</option>
                  <option value="151">CROWN (1,049)</option>
                  <option value="152">CROWN ATHLETE SERIES (77)</option>
                  <option value="153">CROWN COMFORT (1)</option>
                  <option value="154">CROWN ESTATE (60)</option>
                  <option value="156">CROWN HYBRID (524)</option>
                  <option value="157">CROWN MAJESTA (206)</option>
                  <option value="158">CROWN ROYAL SERIES (17)</option>
                  <option value="159">CROWN SEDAN (17)</option>
                  <option value="160">CROWN STATION WAGON (21)</option>
                  <option value="161">CROWN VAN (4)</option>
                  <option value="1534">CROWN VICTORIA (1)</option>
                  <option value="2156">CRUZE (42)</option>
                  <option value="13417">CT (208)</option>
                  <option value="1021">CTS (136)</option>
                  <option value="384">CUBE (850)</option>
                  <option value="385">CUBE CUBIC (43)</option>
                  <option value="16420">CULLINAN (28)</option>
                  <option value="624">CULTUS (1)</option>
                  <option value="162">CURREN (1)</option>
                  <option value="13379">CX-3 (241)</option>
                  <option value="16411">CX-30 (2)</option>
                  <option value="13365">CX-5 (815)</option>
                  <option value="492">CX-7 (26)</option>
                  <option value="16123">CX-8 (96)</option>
                  <option value="163">CYNOS (5)</option>
                  <option value="1425">D-MAX (312)</option>
                  <option value="13555">D5 (7)</option>
                  <option value="16357">D8K (1)</option>
                  <option value="1901">DAEWOO OTHERS (13)</option>
                  <option value="724">DAIHATSU OTHERS (5)</option>
                  <option value="2202">DAKOTA (14)</option>
                  <option value="1902">DAMAS (1)</option>
                  <option value="386">DATSUN PICKUP (36)</option>
                  <option value="389">DATSUN TRUCK (18)</option>
                  <option value="15619">DAYZ (1,681)</option>
                  <option value="15620">DAYZ ROOX (1,291)</option>
                  <option value="544">DEBONAIR (2)</option>
                  <option value="842">DEFENDER (13)</option>
                  <option value="164">DELIBOY (5)</option>
                  <option value="1312">DELICA (2)</option>
                  <option value="545">DELICA CARGO (6)</option>
                  <option value="13300">DELICA D2 (224)</option>
                  <option value="14352">DELICA D3 (6)</option>
                  <option value="546">DELICA D5 (506)</option>
                  <option value="547">DELICA SPACEGEAR (72)</option>
                  <option value="548">DELICA STARWAGON (19)</option>
                  <option value="549">DELICA TRUCK (11)</option>
                  <option value="550">DELICA VAN (15)</option>
                  <option value="1803">DELTA (1)</option>
                  <option value="692">DELTA TRUCK (3)</option>
                  <option value="493">DEMIO (968)</option>
                  <option value="1022">DEVILLE (4)</option>
                  <option value="13297">DEX (9)</option>
                  <option value="551">DIAMANTE SEDAN (4)</option>
                  <option value="552">DIAMANTE WAGON (1)</option>
                  <option value="1053">DIAS WAGON (116)</option>
                  <option value="554">DION (3)</option>
                  <option value="843">DISCOVERY (102)</option>
                  <option value="844">DISCOVERY 3 (106)</option>
                  <option value="13705">DISCOVERY 4 (601)</option>
                  <option value="16084">DISCOVERY SPORT (84)</option>
                  <option value="1762">DOBLO (3)</option>
                  <option value="306">DOMANI (1)</option>
                  <option value="1054">DOMINGO (5)</option>
                  <option value="16400">DS 3 CROSSBACK (1)</option>
                  <option value="15611">DS3 (60)</option>
                  <option value="16028">DS4 (21)</option>
                  <option value="16364">DS5 (7)</option>
                  <option value="1023">DTS (2)</option>
                  <option value="388">DUALIS (125)</option>
                  <option value="1763">DUCATO CARGO (3)</option>
                  <option value="165">DUET (4)</option>
                  <option value="2205">DURANGO (19)</option>
                  <option value="1981">DUTRO (817)</option>
                  <option value="166">DYNA ROUTE VAN (6)</option>
                  <option value="167">DYNA TRUCK (702)</option>
                  <option value="168">DYNA URBAN SUPPORTER (2)</option>
                  <option value="169">DYNA VAN (3)</option>
                  <option value="1929">DYNASTY (1)</option>
                  <option value="16389">E- TRON (5)</option>
                  <option value="1107">E-CLASS (2,064)</option>
                  <option value="2535">E-CLASS (1)</option>
                  <option value="16515">E-CLASS CONVERTIBLE (4)</option>
                  <option value="16406">E-PACE (162)</option>
                  <option value="1589">E-TYPE (1)</option>
                  <option value="555">ECLIPSE (8)</option>
                  <option value="15727">ECLIPSE CROSS (25)</option>
                  <option value="556">ECLIPSESPYDER (13)</option>
                  <option value="1536">ECOSPORTS (2)</option>
                  <option value="15839">ECP55CS (1)</option>
                  <option value="1537">EDGE (42)</option>
                  <option value="307">EDIX (37)</option>
                  <option value="557">EK ACTIVE (9)</option>
                  <option value="558">EK CLASSY (6)</option>
                  <option value="15566">EK CUSTOM (215)</option>
                  <option value="15665">EK SPACE (329)</option>
                  <option value="559">EK SPORT (81)</option>
                  <option value="560">EK WAGON (928)</option>
                  <option value="1931">ELANTRA (6)</option>
                  <option value="308">ELEMENT (45)</option>
                  <option value="663">ELF TRUCK (1,548)</option>
                  <option value="664">ELF UT (2)</option>
                  <option value="665">ELF VAN (1)</option>
                  <option value="390">ELGRAND (575)</option>
                  <option value="1892">ELISE (8)</option>
                  <option value="309">ELYSION (143)</option>
                  <option value="2129">ENCLAVE (11)</option>
                  <option value="496">ENFINI RX-7 (11)</option>
                  <option value="1968">ENVOY (6)</option>
                  <option value="772">EOS (11)</option>
                  <option value="940">EQUINOX (38)</option>
                  <option value="1932">EQUUS (1)</option>
                  <option value="2598">ES (83)</option>
                  <option value="2148">ESCALADE (65)</option>
                  <option value="804">ESCAPE (149)</option>
                  <option value="391">ESCARGO (2)</option>
                  <option value="628">ESCUDO (90)</option>
                  <option value="16470">ESCUDO (1)</option>
                  <option value="1893">ESPRIT (1)</option>
                  <option value="15616">ESQUIRE (249)</option>
                  <option value="694">ESSE (361)</option>
                  <option value="170">ESTIMA (611)</option>
                  <option value="171">ESTIMA EMINA (8)</option>
                  <option value="172">ESTIMA HYBRID (100)</option>
                  <option value="173">ESTIMA L (3)</option>
                  <option value="174">ESTIMA LUCIDA (1)</option>
                  <option value="175">ESTIMA T (12)</option>
                  <option value="501">EUNOS ROADSTER (7)</option>
                  <option value="16186">EUROCARGO (10)</option>
                  <option value="1668">EUROVAN (1)</option>
                  <option value="16493">EVEREST (16)</option>
                  <option value="629">EVERY (1,906)</option>
                  <option value="630">EVERY LANDY (10)</option>
                  <option value="631">EVERY PLUS (2)</option>
                  <option value="632">EVERY WAGON (1,009)</option>
                  <option value="13232">EVORA (2)</option>
                  <option value="16077">EX37 (2)</option>
                  <option value="392">EXA (1)</option>
                  <option value="1540">EXCURSION (2)</option>
                  <option value="1055">EXIGA (264)</option>
                  <option value="16384">EXIGA CROSSOVER 7 (2)</option>
                  <option value="1896">EXIGE (1)</option>
                  <option value="805">EXPEDITION (23)</option>
                  <option value="806">EXPLORER (493)</option>
                  <option value="1541">EXPLORER SPORT TRAC (19)</option>
                  <option value="2611">EXPRESS (6)</option>
                  <option value="16407">F-PACE (425)</option>
                  <option value="807">F150 (149)</option>
                  <option value="1545">F250 (3)</option>
                  <option value="1546">F350 (1)</option>
                  <option value="1090">F355 (6)</option>
                  <option value="1092">F430 (12)</option>
                  <option value="1263">FAIRLADY (54)</option>
                  <option value="394">FAIRLADY Z (479)</option>
                  <option value="502">FAMILIA (4)</option>
                  <option value="503">FAMILIA S-WAGON (3)</option>
                  <option value="504">FAMILIA VAN (30)</option>
                  <option value="666">FARGO BUS (1)</option>
                  <option value="16226">FE (3)</option>
                  <option value="1097">FERRARI OTHERS (64)</option>
                  <option value="809">FESTIVA MINI WAGON (1)</option>
                  <option value="16227">FH (30)</option>
                  <option value="15697">FH TRACTOR (3)</option>
                  <option value="16228">FH12 (7)</option>
                  <option value="16230">FH16 (1)</option>
                  <option value="1198">FIAT OTHERS (2)</option>
                  <option value="810">FIESTA (5)</option>
                  <option value="395">FIGARO (19)</option>
                  <option value="562">FIGHTER (451)</option>
                  <option value="1319">FIGHTER MIGNON (52)</option>
                  <option value="2179">FIREBIRD (1)</option>
                  <option value="310">FIT (1,391)</option>
                  <option value="311">FIT ARIA (7)</option>
                  <option value="13305">FIT HYBRID (716)</option>
                  <option value="13382">FIT SHUTTLE (36)</option>
                  <option value="13302">FIT SHUTTLE HYBRID (120)</option>
                  <option value="1221">FJ CRUISER (155)</option>
                  <option value="16231">FL (2)</option>
                  <option value="15638">FLAIR (222)</option>
                  <option value="15948">FLAIR CROSSOVER (127)</option>
                  <option value="15570">FLAIR WAGON (217)</option>
                  <option value="2149">FLEETWOOD (9)</option>
                  <option value="16242">FM  (55)</option>
                  <option value="16246">FM 12 (6)</option>
                  <option value="16243">FM 7 (1)</option>
                  <option value="16244">FM 9 (1)</option>
                  <option value="811">FOCUS (7)</option>
                  <option value="825">FORD OTHERS (2)</option>
                  <option value="1056">FORESTER (560)</option>
                  <option value="2259">FORFOUR (88)</option>
                  <option value="13839">FORTE (61)</option>
                  <option value="1222">FORTUNER (308)</option>
                  <option value="2260">FORTWO (111)</option>
                  <option value="1427">FORWARD (508)</option>
                  <option value="15687">FORWARD JUSTON (30)</option>
                  <option value="312">FREED (727)</option>
                  <option value="13324">FREED HYBRID (292)</option>
                  <option value="13292">FREED SPIKE (85)</option>
                  <option value="845">FREELANDER (58)</option>
                  <option value="846">FREELANDER 2 (570)</option>
                  <option value="16331">FREEMONT (2)</option>
                  <option value="1397">FRONTE (1)</option>
                  <option value="1264">FRONTIER (6)</option>
                  <option value="13821">FRONTIER (4)</option>
                  <option value="563">FTO (9)</option>
                  <option value="396">FUGA (297)</option>
                  <option value="13824">FUGA HYBRID (75)</option>
                  <option value="15949">FULLBACK (2)</option>
                  <option value="176">FUN CARGO (8)</option>
                  <option value="1553">FUSION (12)</option>
                  <option value="2123">FUSO OTHERS (11)</option>
                  <option value="2063">FX (1)</option>
                  <option value="16078">FX30 (9)</option>
                  <option value="16079">FX50 (2)</option>
                  <option value="16221">G SERIES (9)</option>
                  <option value="1108">G-CLASS (394)</option>
                  <option value="2536">G-CLASS (2)</option>
                  <option value="16485">G80 (1)</option>
                  <option value="13503">GALAMIO (2)</option>
                  <option value="564">GALANT (6)</option>
                  <option value="565">GALANT FORTIS (47)</option>
                  <option value="566">GALANT LAMBDA (1)</option>
                  <option value="1322">GALANT SPORTS (4)</option>
                  <option value="813">GALAXY (1)</option>
                  <option value="2571">GALLARDO (16)</option>
                  <option value="1445">GALUE (1)</option>
                  <option value="1446">GALUE 204 (2)</option>
                  <option value="673">GEMINI (5)</option>
                  <option value="735">GENESIS (314)</option>
                  <option value="2563">GHIBLI (50)</option>
                  <option value="15555">GHOST (6)</option>
                  <option value="1430">GIGA (183)</option>
                  <option value="16057">GIULIETTA (102)</option>
                  <option value="1109">GL-CLASS (135)</option>
                  <option value="15621">GLA-CLASS (120)</option>
                  <option value="16414">GLB- CLASS (178)</option>
                  <option value="16058">GLC-CLASS (1,027)</option>
                  <option value="15668">GLE-CLASS (458)</option>
                  <option value="13364">GLK-CLASS (119)</option>
                  <option value="397">GLORIA CIMA (4)</option>
                  <option value="400">GLORIA WAGON (5)</option>
                  <option value="401">GLORIA(SEDAN) (94)</option>
                  <option value="16412">GLS CLASS (119)</option>
                  <option value="1971">GMC OTHERS (22)</option>
                  <option value="773">GOLF (699)</option>
                  <option value="1671">GOLF GTI (60)</option>
                  <option value="774">GOLF PLUS (8)</option>
                  <option value="16070">GOLF R (11)</option>
                  <option value="775">GOLF TOURAN (120)</option>
                  <option value="776">GOLF VARIANT (242)</option>
                  <option value="777">GOLF WAGON (10)</option>
                  <option value="13372">GRACE (60)</option>
                  <option value="13706">GRANBIRD (41)</option>
                  <option value="1845">GRAND CARNIVAL (2)</option>
                  <option value="1165">GRAND CHEROKEE (543)</option>
                  <option value="633">GRAND ESCUDO (1)</option>
                  <option value="179">GRAND HIACE (30)</option>
                  <option value="2652">GRAND MARQUIS (1)</option>
                  <option value="13267">GRAND STAREX (533)</option>
                  <option value="1398">GRAND VITARA (70)</option>
                  <option value="795">GRAND VOYAGER (6)</option>
                  <option value="1199">GRANDE PUNTO (5)</option>
                  <option value="1937">GRANDEUR (195)</option>
                  <option value="1938">GRANDEUR TG (2)</option>
                  <option value="567">GRANDIS (3)</option>
                  <option value="1794">GRANSPORT (1)</option>
                  <option value="2564">GRANTURISMO (48)</option>
                  <option value="180">GRANVIA (19)</option>
                  <option value="1323">GREAT (1)</option>
                  <option value="2607">GREAT (1)</option>
                  <option value="2114">GS (338)</option>
                  <option value="2115">GS HYBRID (2)</option>
                  <option value="1147">GT (15)</option>
                  <option value="568">GTO (19)</option>
                  <option value="1148">GTV (2)</option>
                  <option value="16468">GV70 (1)</option>
                  <option value="16469">GV80 (1)</option>
                  <option value="897">GX 470 (4)</option>
                  <option value="2580">H1 (2)</option>
                  <option value="1940">H100 (4)</option>
                  <option value="1155">H2 (15)</option>
                  <option value="1156">H3 (37)</option>
                  <option value="181">HARRIER (667)</option>
                  <option value="182">HARRIER HYBRID (151)</option>
                  <option value="1941">HD (3)</option>
                  <option value="944">HHR (3)</option>
                  <option value="183">HIACE COMMUTER (74)</option>
                  <option value="184">HIACE TRUCK (19)</option>
                  <option value="185">HIACE VAN (1,769)</option>
                  <option value="186">HIACE WAGON (470)</option>
                  <option value="1223">HIGHLANDER (56)</option>
                  <option value="697">HIJET CARGO (974)</option>
                  <option value="698">HIJET GRANCARGO (2)</option>
                  <option value="699">HIJET TRUCK (1,125)</option>
                  <option value="700">HIJET VAN (77)</option>
                  <option value="187">HILUX (2,215)</option>
                  <option value="188">HILUX SPORTS PICKUP (56)</option>
                  <option value="189">HILUX SURF (358)</option>
                  <option value="191">HILUX TRUCK (1)</option>
                  <option value="13881">HIMEDIC (1)</option>
                  <option value="1099">HINO OTHERS (82)</option>
                  <option value="403">HOMY COACH (5)</option>
                  <option value="404">HOMY ELGRAND (6)</option>
                  <option value="405">HOMY VAN (1)</option>
                  <option value="351">HONDA OTHERS (13)</option>
                  <option value="315">HR-V (10)</option>
                  <option value="13263">HS (89)</option>
                  <option value="14395">HUSTLER (1,435)</option>
                  <option value="741">HYUNDAI OTHERS (4)</option>
                  <option value="569">I (253)</option>
                  <option value="13393">I-MIEV (38)</option>
                  <option value="14057">I3 (27)</option>
                  <option value="13271">I30 (186)</option>
                  <option value="13544">I30CW (1)</option>
                  <option value="14081">I40 (77)</option>
                  <option value="16508">ID.3 (1)</option>
                  <option value="16509">ID.6 (1)</option>
                  <option value="1399">IGNIS (84)</option>
                  <option value="945">IMPALA (4)</option>
                  <option value="1057">IMPREZA (568)</option>
                  <option value="13262">IMPREZA ANESIS (11)</option>
                  <option value="13304">IMPREZA G4 (109)</option>
                  <option value="1058">IMPREZA HARDTOP SEDAN (15)</option>
                  <option value="16139">IMPREZA SPORT HYBRID (11)</option>
                  <option value="13306">IMPREZA SPORTS (358)</option>
                  <option value="1059">IMPREZA SPORTSWAGON (81)</option>
                  <option value="1060">IMPREZA WRX (82)</option>
                  <option value="1061">IMPREZA WRX STI (59)</option>
                  <option value="13510">IMPREZA XV (29)</option>
                  <option value="15565">IMPREZA XV HYBRID (46)</option>
                  <option value="2069">INFINITI OTHERS (9)</option>
                  <option value="316">INSIGHT (244)</option>
                  <option value="13392">INSIGHT EXCLUSIVE (10)</option>
                  <option value="317">INSPIRE (39)</option>
                  <option value="318">INTEGRA (141)</option>
                  <option value="192">IPSUM (8)</option>
                  <option value="1225">IQ (201)</option>
                  <option value="2116">IS (446)</option>
                  <option value="2117">IS F (33)</option>
                  <option value="13430">ISEKI OTHERS (1)</option>
                  <option value="193">ISIS (330)</option>
                  <option value="194">IST (58)</option>
                  <option value="681">ISUZU OTHERS (12)</option>
                  <option value="2295">IVECO OTHERS (1)</option>
                  <option value="16066">JADE (45)</option>
                  <option value="1016">JAGUAR OTHERS (36)</option>
                  <option value="320">JAZZ (4)</option>
                  <option value="15594">JC (3)</option>
                  <option value="570">JEEP (35)</option>
                  <option value="1174">JEEP OTHERS (3)</option>
                  <option value="778">JETTA (355)</option>
                  <option value="634">JIMNY (2,265)</option>
                  <option value="635">JIMNY L (2)</option>
                  <option value="636">JIMNY SIERRA (181)</option>
                  <option value="637">JIMNY WIDE (13)</option>
                  <option value="16091">JOHN DEER OTHERS (8)</option>
                  <option value="16399">JOURNEY (4)</option>
                  <option value="675">JOURNEY BUS (6)</option>
                  <option value="13240">JUKE (407)</option>
                  <option value="1439">JUSTON (21)</option>
                  <option value="1391">JUSTY (14)</option>
                  <option value="13595">K3 (431)</option>
                  <option value="13472">K5 (OPTIMA) (1,267)</option>
                  <option value="13589">K7 (192)</option>
                  <option value="816">KA (1)</option>
                  <option value="2550">KANGOO (175)</option>
                  <option value="638">KEI (206)</option>
                  <option value="16457">KICKS (48)</option>
                  <option value="13473">KIX (67)</option>
                  <option value="15713">KIZASHI (13)</option>
                  <option value="196">KLUGER (34)</option>
                  <option value="13843">KOLEOS (2)</option>
                  <option value="2108">KOMATSU OTHERS (3)</option>
                  <option value="15626">KONA (62)</option>
                  <option value="2082">KORANDO (444)</option>
                  <option value="16488">KORANDO TURISMO (4)</option>
                  <option value="13293">KUBOTA OTHERS (3)</option>
                  <option value="13485">KUGA (4)</option>
                  <option value="2083">KYRON (6)</option>
                  <option value="1325">L200 (374)</option>
                  <option value="16052">L2202 (1)</option>
                  <option value="2614">LACETTI (2)</option>
                  <option value="1907">LACETTI (CRUZE) (1)</option>
                  <option value="408">LAFESTA (234)</option>
                  <option value="321">LAGREAT (6)</option>
                  <option value="2551">LAGUNA (1)</option>
                  <option value="2572">LAMBORGHINI OTHERS (45)</option>
                  <option value="571">LANCER (136)</option>
                  <option value="572">LANCER CARGO (18)</option>
                  <option value="573">LANCER CEDIA (1)</option>
                  <option value="575">LANCER EVOLUTION (19)</option>
                  <option value="579">LANCER EVOLUTION VIII (1)</option>
                  <option value="581">LANCER EVOLUTION WAGON (2)</option>
                  <option value="586">LANCER WAGON (15)</option>
                  <option value="198">LAND CRUISER (788)</option>
                  <option value="16086">LAND CRUISER AMAZON (15)</option>
                  <option value="199">LAND CRUISER CYGNUS (3)</option>
                  <option value="200">LAND CRUISER PRADO (787)</option>
                  <option value="849">LAND ROVER OTHERS (9)</option>
                  <option value="639">LANDY (46)</option>
                  <option value="506">LANTIS (4)</option>
                  <option value="640">LAPIN (2,335)</option>
                  <option value="507">LAPUTA (8)</option>
                  <option value="409">LARGO (4)</option>
                  <option value="1909">LASETTI (3)</option>
                  <option value="13308">LATIO (14)</option>
                  <option value="410">LAUREL (61)</option>
                  <option value="13366">LEAF (131)</option>
                  <option value="1062">LEGACY (45)</option>
                  <option value="1063">LEGACY B4 (427)</option>
                  <option value="13249">LEGACY LANCASTER (5)</option>
                  <option value="1064">LEGACY TOURING WAGON (719)</option>
                  <option value="322">LEGEND (65)</option>
                  <option value="587">LEGNUM (5)</option>
                  <option value="411">LEOPARD (7)</option>
                  <option value="412">LEOPARD JFEREE (4)</option>
                  <option value="508">LEVANTE (1)</option>
                  <option value="14264">LEVORG (333)</option>
                  <option value="916">LEXUS OTHERS (126)</option>
                  <option value="16169">LF (4)</option>
                  <option value="16171">LF55 (6)</option>
                  <option value="13822">LIBERO (1)</option>
                  <option value="413">LIBERTY (4)</option>
                  <option value="1169">LIBERTY (3)</option>
                  <option value="2481">LIEBHERR OTHERS (6)</option>
                  <option value="1982">LIESSE (8)</option>
                  <option value="1983">LIESSE II (35)</option>
                  <option value="324">LIFE (1,130)</option>
                  <option value="325">LIFE DUNK (20)</option>
                  <option value="998">LINCOLN OTHERS (2)</option>
                  <option value="203">LITEACE NOAH (14)</option>
                  <option value="204">LITEACE TRUCK (53)</option>
                  <option value="205">LITEACE VAN (49)</option>
                  <option value="206">LITEACE WAGON (2)</option>
                  <option value="326">LOGO (1)</option>
                  <option value="1988">LR2 (1)</option>
                  <option value="2599">LS (657)</option>
                  <option value="509">LUCE (3)</option>
                  <option value="414">LUCINO (1)</option>
                  <option value="16049">LUCRA (28)</option>
                  <option value="16142">LUCRA CUSTOM (6)</option>
                  <option value="779">LUPO (25)</option>
                  <option value="2552">LUTECIA (89)</option>
                  <option value="2600">LX (40)</option>
                  <option value="1040">M MODEL (10)</option>
                  <option value="1110">M-CLASS (329)</option>
                  <option value="2537">M-CLASS (1)</option>
                  <option value="16027">M2 (14)</option>
                  <option value="16197">M2000 (2)</option>
                  <option value="13272">M3 (48)</option>
                  <option value="16483">M37 (2)</option>
                  <option value="16118">M4 (42)</option>
                  <option value="13273">M5 (30)</option>
                  <option value="13274">M6 (17)</option>
                  <option value="16417">MACAN (1)</option>
                  <option value="2206">MAGNUM (5)</option>
                  <option value="948">MALIBU (89)</option>
                  <option value="2303">MAN OTHERS (5)</option>
                  <option value="416">MARCH (704)</option>
                  <option value="417">MARCH BOX (2)</option>
                  <option value="207">MARK II (201)</option>
                  <option value="208">MARK II BLIT (28)</option>
                  <option value="209">MARK II QUALIS (4)</option>
                  <option value="210">MARK II VAN (5)</option>
                  <option value="211">MARK II WAGON (16)</option>
                  <option value="212">MARK X (832)</option>
                  <option value="213">MARK X ZIO (85)</option>
                  <option value="1797">MASERATI OTHERS (47)</option>
                  <option value="16092">MASSEY FERGUSON OTHERS (19)</option>
                  <option value="214">MASTERACE SURF (2)</option>
                  <option value="1912">MATIZ (SPARK) (6)</option>
                  <option value="701">MAX (28)</option>
                  <option value="13884">MAXCRUZ (209)</option>
                  <option value="418">MAXIMA (2)</option>
                  <option value="1994">MAYBACH OTHERS (1)</option>
                  <option value="532">MAZDA OTHERS (8)</option>
                  <option value="1375">MAZDA2 (33)</option>
                  <option value="1376">MAZDA3 (123)</option>
                  <option value="1377">MAZDA5 (1)</option>
                  <option value="1378">MAZDA6 (14)</option>
                  <option value="327">MDX (4)</option>
                  <option value="2595">MDX (1)</option>
                  <option value="15712">MEBIUS (3)</option>
                  <option value="215">MEGACRUISER (1)</option>
                  <option value="2553">MEGANE (59)</option>
                  <option value="13844">MEGANE ESTATE (19)</option>
                  <option value="1746">MEGANE TOURING WAGON (1)</option>
                  <option value="16350">MEGATRUCK (1)</option>
                  <option value="1984">MELPHA (2)</option>
                  <option value="1111">MERCEDES-BENZ OTHERS (70)</option>
                  <option value="1651">MERIVA (1)</option>
                  <option value="1877">MG OTHERS (6)</option>
                  <option value="837">MGF (1)</option>
                  <option value="2575">MGF (2)</option>
                  <option value="1273">MICRA (1)</option>
                  <option value="419">MICRAC C+C (18)</option>
                  <option value="702">MIDGET II (77)</option>
                  <option value="1112">MIDIUM CLASS (46)</option>
                  <option value="16209">MIDLUM (6)</option>
                  <option value="1946">MIGHTY (22)</option>
                  <option value="641">MIGTY BOY (7)</option>
                  <option value="511">MILLENIA (5)</option>
                  <option value="839">MINI (105)</option>
                  <option value="1041">MINI (2,689)</option>
                  <option value="1042">MINI CLUBMAN (101)</option>
                  <option value="591">MINICA (44)</option>
                  <option value="592">MINICA TOPO (7)</option>
                  <option value="13509">MINICAB BRAVO (1)</option>
                  <option value="13883">MINICAB MIEV (3)</option>
                  <option value="593">MINICAB TRUCK (255)</option>
                  <option value="1330">MINICAB VAN (195)</option>
                  <option value="703">MIRA (740)</option>
                  <option value="704">MIRA AVY (37)</option>
                  <option value="15603">MIRA COCOA (1,357)</option>
                  <option value="705">MIRA CUSTOM (92)</option>
                  <option value="13826">MIRA ES (1,461)</option>
                  <option value="706">MIRA GINO1000 (9)</option>
                  <option value="594">MIRAGE (81)</option>
                  <option value="707">MIRAGINO (878)</option>
                  <option value="420">MISTRAL (4)</option>
                  <option value="13298">MITO (65)</option>
                  <option value="614">MITSUBISHI OTHERS (5)</option>
                  <option value="993">MKX (1)</option>
                  <option value="994">MKZ (4)</option>
                  <option value="1696">ML CLASS (355)</option>
                  <option value="328">MOBILIO (10)</option>
                  <option value="329">MOBILIO SPIKE (75)</option>
                  <option value="421">MOCO (1,407)</option>
                  <option value="16507">MODEL 3 (2)</option>
                  <option value="16074">MODEL S (6)</option>
                  <option value="16506">MODEL Y (1)</option>
                  <option value="1851">MOHAVE (397)</option>
                  <option value="818">MONDEO (1)</option>
                  <option value="1094">MONDIAL (2)</option>
                  <option value="1333">MONTERO (1)</option>
                  <option value="1852">MORNING (PICANTO) (656)</option>
                  <option value="708">MOVE (3,171)</option>
                  <option value="15784">MOVE CANBUS (480)</option>
                  <option value="709">MOVE CONTE (878)</option>
                  <option value="710">MOVE CUSTOM (178)</option>
                  <option value="711">MOVE LATTE (190)</option>
                  <option value="512">MPV (210)</option>
                  <option value="642">MR WAGON (733)</option>
                  <option value="217">MR-S (102)</option>
                  <option value="216">MR2 (55)</option>
                  <option value="676">MU (6)</option>
                  <option value="13259">MU (1)</option>
                  <option value="13238">MU WIZARD (1)</option>
                  <option value="1128">MULSANNE (4)</option>
                  <option value="1200">MULTIPLA (6)</option>
                  <option value="422">MURANO (157)</option>
                  <option value="2573">MURCIELAGO (3)</option>
                  <option value="2084">MUSSO (2)</option>
                  <option value="819">MUSTANG (83)</option>
                  <option value="2164">MW (18)</option>
                  <option value="13250">N BOX (3,807)</option>
                  <option value="16472">N BOX CUSTOM (1)</option>
                  <option value="15652">N BOX PLUS (224)</option>
                  <option value="16130">N BOX SLASH (122)</option>
                  <option value="15782">N-ONE (828)</option>
                  <option value="13861">N-WGN (1,000)</option>
                  <option value="218">NADIA (1)</option>
                  <option value="712">NAKED (138)</option>
                  <option value="1274">NAVARA (669)</option>
                  <option value="995">NAVIGATOR (17)</option>
                  <option value="780">NEW BEETLE (190)</option>
                  <option value="16093">NEW HOLLAND OTHERS (5)</option>
                  <option value="13241">NEW PANDA (19)</option>
                  <option value="13268">NEW SUPER AERO CITY (1)</option>
                  <option value="1947">NF SONATA (1)</option>
                  <option value="14177">NIRO (6)</option>
                  <option value="423">NISSAN GT-R (14)</option>
                  <option value="474">NISSAN OTHERS (664)</option>
                  <option value="2210">NITRO (23)</option>
                  <option value="2091">NIVA (1)</option>
                  <option value="219">NOAH (813)</option>
                  <option value="13519">NOAH HYBRID (1)</option>
                  <option value="425">NOTE (1,795)</option>
                  <option value="1452">NOUERA (4)</option>
                  <option value="2325">NOVUS (1)</option>
                  <option value="16347">NOVUS (2)</option>
                  <option value="330">NSX (23)</option>
                  <option value="2596">NSX (1)</option>
                  <option value="16108">NT450 ATLAS (3)</option>
                  <option value="15661">NV150 AD (73)</option>
                  <option value="13378">NV200VANETTE WAGON (67)</option>
                  <option value="13545">NX (219)</option>
                  <option value="331">ODYSSEY (583)</option>
                  <option value="220">OPA (1)</option>
                  <option value="1853">OPIRUS (1)</option>
                  <option value="713">OPTI (30)</option>
                  <option value="1854">OPTIMA (4)</option>
                  <option value="1228">ORIGIN (6)</option>
                  <option value="13575">ORLANDO (95)</option>
                  <option value="2000">OTHER ALL (1)</option>
                  <option value="13858">OTHERS (8)</option>
                  <option value="426">OTTI (253)</option>
                  <option value="1068">OUTBACK (203)</option>
                  <option value="599">OUTLANDER (137)</option>
                  <option value="13394">OUTLANDER PHEV (102)</option>
                  <option value="16222">P SERIES (90)</option>
                  <option value="1441">PA NERO (1)</option>
                  <option value="600">PAJERO (221)</option>
                  <option value="601">PAJERO IO (43)</option>
                  <option value="602">PAJERO JR (12)</option>
                  <option value="603">PAJERO MINI (542)</option>
                  <option value="643">PALETTE (1,280)</option>
                  <option value="16067">PALISADE (235)</option>
                  <option value="13845">PAMAX (3)</option>
                  <option value="16444">PANAMERA (9)</option>
                  <option value="10000">PANDA (52)</option>
                  <option value="427">PAO (22)</option>
                  <option value="333">PARTNER (1)</option>
                  <option value="781">PASSAT (259)</option>
                  <option value="13429">PASSAT ALLTRACK (2)</option>
                  <option value="13303">PASSAT CC (13)</option>
                  <option value="782">PASSAT VARIANT (110)</option>
                  <option value="13233">PASSAT WAGON (4)</option>
                  <option value="221">PASSO (908)</option>
                  <option value="13237">PASSO SETTE (14)</option>
                  <option value="1276">PATHFINDER (92)</option>
                  <option value="1170">PATRIOT (54)</option>
                  <option value="15959">PATROL (10)</option>
                  <option value="1277">PATROL GR (1)</option>
                  <option value="1596">PHANTOM (3)</option>
                  <option value="2520">PICKUP (1)</option>
                  <option value="428">PINO (76)</option>
                  <option value="13885">PIXIS EPOCH (155)</option>
                  <option value="15602">PIXIS JOY (25)</option>
                  <option value="15630">PIXIS SPACE (169)</option>
                  <option value="14284">PIXIS TRUCK (29)</option>
                  <option value="14404">PIXIS VAN (157)</option>
                  <option value="222">PLATZ (15)</option>
                  <option value="1069">PLEO (162)</option>
                  <option value="16045">PLEO NESTA (3)</option>
                  <option value="15614">PLEO PLUS (77)</option>
                  <option value="783">POLO (481)</option>
                  <option value="2188">PONTIAC OTHERS (1)</option>
                  <option value="867">PORSCHE OTHERS (152)</option>
                  <option value="223">PORTE (437)</option>
                  <option value="1948">PORTER (1,349)</option>
                  <option value="514">PORTER CAB (6)</option>
                  <option value="2518">PRADO (33)</option>
                  <option value="334">PRELUDE (20)</option>
                  <option value="515">PREMACY (379)</option>
                  <option value="224">PREMIO (79)</option>
                  <option value="16210">PREMIUM (15)</option>
                  <option value="432">PRESAGE (34)</option>
                  <option value="433">PRESEA (1)</option>
                  <option value="434">PRESIDENT (26)</option>
                  <option value="435">PRESIDENT JS (2)</option>
                  <option value="1231">PREVIA (7)</option>
                  <option value="1860">PRIDE (RIO) (5)</option>
                  <option value="436">PRIMERA (19)</option>
                  <option value="437">PRIMERA CAMINO (2)</option>
                  <option value="438">PRIMERA CAMINO WAGON (2)</option>
                  <option value="440">PRIMERA WAGON (6)</option>
                  <option value="225">PRIUS (2,914)</option>
                  <option value="13283">PRIUS ALPHA (550)</option>
                  <option value="15944">PRIUS C (1)</option>
                  <option value="16053">PRIUS PHV (142)</option>
                  <option value="226">PROBOX (187)</option>
                  <option value="227">PROBOX VAN (256)</option>
                  <option value="228">PROBOX WAGON (21)</option>
                  <option value="516">PROCEED (14)</option>
                  <option value="2761">PROCEED LEVANTE (1)</option>
                  <option value="517">PROCEED MARVIE (4)</option>
                  <option value="1985">PROFIA (114)</option>
                  <option value="229">PROGRES (28)</option>
                  <option value="230">PRONARD (4)</option>
                  <option value="605">PROUDIA (6)</option>
                  <option value="797">PT CRUISER (20)</option>
                  <option value="798">PT CRUISER CABRIO (11)</option>
                  <option value="231">PUBLICA (3)</option>
                  <option value="443">PULSAR (11)</option>
                  <option value="441">PULSAR SERIE S-RV (1)</option>
                  <option value="1202">PUNTO (7)</option>
                  <option value="14073">PUNTO EVO (5)</option>
                  <option value="714">PYZAR (1)</option>
                  <option value="15702">Q2 (67)</option>
                  <option value="13400">Q3 (173)</option>
                  <option value="2074">Q45 (1)</option>
                  <option value="13314">Q5 (384)</option>
                  <option value="16319">Q50 (43)</option>
                  <option value="757">Q7 (224)</option>
                  <option value="14074">QASHQAI (46)</option>
                  <option value="14140">QM3 (20)</option>
                  <option value="2382">QM5 (67)</option>
                  <option value="16137">QM6 (2)</option>
                  <option value="2565">QUATTROPORTE (69)</option>
                  <option value="232">QUICK DELIVERY (11)</option>
                  <option value="1268">QUON (59)</option>
                  <option value="16073">QUON (16)</option>
                  <option value="16403">QX30 (4)</option>
                  <option value="2076">QX56 (10)</option>
                  <option value="16405">QX70 (11)</option>
                  <option value="16223">R SERIES (71)</option>
                  <option value="1113">R-CLASS (10)</option>
                  <option value="1070">R1 (76)</option>
                  <option value="1071">R2 (166)</option>
                  <option value="758">R8 (20)</option>
                  <option value="233">RACTIS (379)</option>
                  <option value="1986">RAINBOW (3)</option>
                  <option value="16315">RAIZE (184)</option>
                  <option value="2213">RAM (23)</option>
                  <option value="847">RANGE ROVER (1,139)</option>
                  <option value="13996">RANGE ROVER EVOQUE (1,416)</option>
                  <option value="848">RANGE ROVER SPORT (1,884)</option>
                  <option value="16085">RANGE ROVER VELAR (150)</option>
                  <option value="1990">RANGE ROVER VOGUE (64)</option>
                  <option value="1559">RANGER (1,227)</option>
                  <option value="2588">RANGER (310)</option>
                  <option value="13321">RANGER (2)</option>
                  <option value="13315">RANGER2 (2)</option>
                  <option value="446">RASHEEN (107)</option>
                  <option value="234">RAUM (63)</option>
                  <option value="235">RAV4 (1,021)</option>
                  <option value="13310">RAY (105)</option>
                  <option value="16120">RC (55)</option>
                  <option value="16121">RC F (38)</option>
                  <option value="15572">RCZ (54)</option>
                  <option value="2137">REGAL (3)</option>
                  <option value="238">REGIUS VAN (6)</option>
                  <option value="239">REGIUS WAGON (15)</option>
                  <option value="13234">REGIUSACE COMMUTER (3)</option>
                  <option value="240">REGIUSACE VAN (571)</option>
                  <option value="2554">RENAULT OTHERS (44)</option>
                  <option value="2383">RENAULT SAMSUNG OTHERS (1)</option>
                  <option value="16317">RENEGADE (246)</option>
                  <option value="518">REVIEW (3)</option>
                  <option value="2085">REXTON (247)</option>
                  <option value="13307">REXTON W (6)</option>
                  <option value="1304">RIDGELINE (2)</option>
                  <option value="1862">RIO (55)</option>
                  <option value="447">RNESSA (2)</option>
                  <option value="519">ROADSTER (579)</option>
                  <option value="2526">ROADSTER (1)</option>
                  <option value="2663">ROADSTER (2)</option>
                  <option value="715">ROCKY (74)</option>
                  <option value="678">RODEO (18)</option>
                  <option value="1279">ROGUE (52)</option>
                  <option value="1600">ROLLS-ROYCE OTHERS (4)</option>
                  <option value="15633">ROOMY (414)</option>
                  <option value="13855">ROOX (1,007)</option>
                  <option value="1340">ROSA (79)</option>
                  <option value="759">RS4 (6)</option>
                  <option value="13697">RS5 (8)</option>
                  <option value="760">RS6 (6)</option>
                  <option value="13552">RS7 (2)</option>
                  <option value="716">RUGGER (1)</option>
                  <option value="241">RUSH (58)</option>
                  <option value="606">RVR (53)</option>
                  <option value="2601">RX (499)</option>
                  <option value="520">RX-7 (44)</option>
                  <option value="521">RX-8 (408)</option>
                  <option value="1455">RYOGA (7)</option>
                  <option value="13886">S'ELEGA (5)</option>
                  <option value="1114">S-CLASS (515)</option>
                  <option value="1561">S-MAX (1)</option>
                  <option value="338">S-MX (12)</option>
                  <option value="1001">S-TYPE (48)</option>
                  <option value="336">S2000 (101)</option>
                  <option value="761">S3 (37)</option>
                  <option value="762">S4 (23)</option>
                  <option value="875">S40 (9)</option>
                  <option value="1642">S5 (32)</option>
                  <option value="763">S6 (20)</option>
                  <option value="876">S60 (97)</option>
                  <option value="16051">S660 (273)</option>
                  <option value="15617">S7 SPORTBACK (2)</option>
                  <option value="764">S8 (10)</option>
                  <option value="878">S80 (16)</option>
                  <option value="879">S90 (5)</option>
                  <option value="337">SABER (4)</option>
                  <option value="448">SAFARI (29)</option>
                  <option value="13299">SAI (162)</option>
                  <option value="1075">SAMBAR (272)</option>
                  <option value="13236">SAMBAR TRUCK (449)</option>
                  <option value="736">SANTA FE (4,040)</option>
                  <option value="522">SAVANNA RX-7 (21)</option>
                  <option value="2118">SC (61)</option>
                  <option value="2319">SCANIA OTHERS (21)</option>
                  <option value="2555">SCENIC (1)</option>
                  <option value="785">SCIROCCO (45)</option>
                  <option value="523">SCRUM (189)</option>
                  <option value="15694">SCRUM TRUCK (36)</option>
                  <option value="524">SCRUM VAN (2)</option>
                  <option value="525">SCRUM WAGON (124)</option>
                  <option value="16330">SELTOS (32)</option>
                  <option value="526">SENTIA (1)</option>
                  <option value="1280">SENTRA (26)</option>
                  <option value="1237">SEQUOIA (144)</option>
                  <option value="244">SERA (3)</option>
                  <option value="450">SERENA (2,194)</option>
                  <option value="1026">SEVILLE (9)</option>
                  <option value="786">SHARAN (70)</option>
                  <option value="1342">SHOGUN (127)</option>
                  <option value="15563">SHUTTLE (185)</option>
                  <option value="1238">SIENNA (32)</option>
                  <option value="245">SIENTA (864)</option>
                  <option value="1975">SIERRA (26)</option>
                  <option value="1654">SIGNUM (1)</option>
                  <option value="955">SILVERADO (47)</option>
                  <option value="452">SILVIA (218)</option>
                  <option value="1418">SIRION (1)</option>
                  <option value="453">SKYLINE (652)</option>
                  <option value="454">SKYLINE COUPE (17)</option>
                  <option value="13354">SKYLINE CROSSOVER (38)</option>
                  <option value="455">SKYLINE GT-R (58)</option>
                  <option value="457">SKYLINE WAGON (1)</option>
                  <option value="1115">SL-CLASS (94)</option>
                  <option value="15715">SLC (13)</option>
                  <option value="1116">SLK (117)</option>
                  <option value="2384">SM3 (3)</option>
                  <option value="2385">SM5 (5)</option>
                  <option value="14137">SM6 (2)</option>
                  <option value="2386">SM7 (1)</option>
                  <option value="1899">SMART (2)</option>
                  <option value="13296">SMART K (20)</option>
                  <option value="2261">SMART OTHERS (1)</option>
                  <option value="246">SOARER (111)</option>
                  <option value="15703">SOLATI (2)</option>
                  <option value="13388">SOLIO (585)</option>
                  <option value="16065">SOLIO BANDIT (239)</option>
                  <option value="737">SONATA (1,067)</option>
                  <option value="15567">SONIC (7)</option>
                  <option value="717">SONICA (60)</option>
                  <option value="1868">SORENTO (2,098)</option>
                  <option value="13391">SOUL (174)</option>
                  <option value="1590">SOVEREIGN (3)</option>
                  <option value="1347">SPACE GEER (1)</option>
                  <option value="13317">SPACE RUNNER RM (3)</option>
                  <option value="13831">SPACIA (2,024)</option>
                  <option value="13396">SPADE (364)</option>
                  <option value="13309">SPARK (178)</option>
                  <option value="247">SPARKY (1)</option>
                  <option value="527">SPIANO (43)</option>
                  <option value="1149">SPIDER (8)</option>
                  <option value="13261">SPLASH (35)</option>
                  <option value="1870">SPORTAGE (3,368)</option>
                  <option value="14355">SPORTRIDER (3)</option>
                  <option value="1698">SPRINTER (1)</option>
                  <option value="13534">SPRINTER (4)</option>
                  <option value="248">SPRINTER CARIB (4)</option>
                  <option value="251">SPRINTER SEDAN (5)</option>
                  <option value="252">SPRINTER TRUENO (28)</option>
                  <option value="253">SPRINTER VAN (1)</option>
                  <option value="13550">SQ5 (11)</option>
                  <option value="1028">SRX (10)</option>
                  <option value="458">STAGEA (65)</option>
                  <option value="1951">STAREX (55)</option>
                  <option value="16503">STARIA (14)</option>
                  <option value="607">STARION (2)</option>
                  <option value="255">STARLET (37)</option>
                  <option value="1073">STELLA (591)</option>
                  <option value="16388">STELVIO (47)</option>
                  <option value="340">STEP WGN (1,306)</option>
                  <option value="14336">STINGER (74)</option>
                  <option value="14261">STONIC (60)</option>
                  <option value="718">STORIA (3)</option>
                  <option value="608">STRADA (4)</option>
                  <option value="16189">STRALIS (18)</option>
                  <option value="341">STREAM (163)</option>
                  <option value="342">STREET (15)</option>
                  <option value="1029">STS (3)</option>
                  <option value="13880">SUBARU 360 (1)</option>
                  <option value="1078">SUBARU OTHERS (21)</option>
                  <option value="960">SUBURBAN (51)</option>
                  <option value="256">SUCCEED (78)</option>
                  <option value="257">SUCCEED VAN (133)</option>
                  <option value="258">SUCCEED WAGON (30)</option>
                  <option value="2110">SUMITOMO OTHERS (1)</option>
                  <option value="459">SUNNY (39)</option>
                  <option value="461">SUNNY TRUCK (16)</option>
                  <option value="16119">SUPER DOLPHIN (5)</option>
                  <option value="13508">SUPER DOLPHIN PROFIA (1)</option>
                  <option value="1350">SUPER GREAT (169)</option>
                  <option value="2608">SUPER GREAT (21)</option>
                  <option value="259">SUPRA (81)</option>
                  <option value="645">SWIFT (1,242)</option>
                  <option value="646">SX4 (19)</option>
                  <option value="15728">SX4 S-CROSS (10)</option>
                  <option value="647">SX4 SEDAN (2)</option>
                  <option value="13745">SYLPHY (58)</option>
                  <option value="16433">T-CROSS (1)</option>
                  <option value="16434">T-ROC (15)</option>
                  <option value="1241">TACOMA (46)</option>
                  <option value="16494">TAFT (296)</option>
                  <option value="961">TAHOE (67)</option>
                  <option value="15662">TANK (388)</option>
                  <option value="719">TANTO (4,644)</option>
                  <option value="720">TANTO CUSTOM (264)</option>
                  <option value="15720">TANTO EXE (241)</option>
                  <option value="2327">TATA OTHERS (1)</option>
                  <option value="821">TAURUS (2)</option>
                  <option value="462">TEANA (189)</option>
                  <option value="260">TERCEL (2)</option>
                  <option value="721">TERIOS (5)</option>
                  <option value="722">TERIOS KID (268)</option>
                  <option value="1419">TERIOS LUCIA (1)</option>
                  <option value="1953">TERRACAN (16)</option>
                  <option value="463">TERRANO (16)</option>
                  <option value="464">TERRANO REGULUS (4)</option>
                  <option value="1096">TESTAROSSA (2)</option>
                  <option value="16198">TGA (9)</option>
                  <option value="2304">TGL (16)</option>
                  <option value="2305">TGM (3)</option>
                  <option value="2306">TGS (19)</option>
                  <option value="2307">TGX (45)</option>
                  <option value="343">THATS (69)</option>
                  <option value="13605">THE BEETLE (224)</option>
                  <option value="1812">THESIS (1)</option>
                  <option value="15663">THOR (132)</option>
                  <option value="1688">TIGUAN (844)</option>
                  <option value="465">TIIDA (129)</option>
                  <option value="466">TIIDA LATIO (19)</option>
                  <option value="467">TINO (1)</option>
                  <option value="528">TITAN (251)</option>
                  <option value="2521">TITAN (8)</option>
                  <option value="529">TITAN DASH (87)</option>
                  <option value="13779">TIVOLI (16)</option>
                  <option value="344">TODAY (38)</option>
                  <option value="13604">TOPPO (116)</option>
                  <option value="609">TOPPO BJ (18)</option>
                  <option value="610">TOPPO BJ WIDE (1)</option>
                  <option value="345">TORNEO (28)</option>
                  <option value="787">TOUAREG (566)</option>
                  <option value="1689">TOURAN (20)</option>
                  <option value="261">TOURING HIACE (13)</option>
                  <option value="611">TOWN BOX (89)</option>
                  <option value="612">TOWN BOX WIDE (1)</option>
                  <option value="996">TOWN CAR (2)</option>
                  <option value="262">TOWNACE NOAH (14)</option>
                  <option value="263">TOWNACE TRUCK (77)</option>
                  <option value="264">TOWNACE VAN (97)</option>
                  <option value="265">TOWNACE WAGON (6)</option>
                  <option value="266">TOYOACE (374)</option>
                  <option value="267">TOYOACE ROUTE VAN (1)</option>
                  <option value="268">TOYOACE URBAN SUPPORTER (2)</option>
                  <option value="283">TOYOTA OTHERS (48)</option>
                  <option value="963">TRAILBLAZER (44)</option>
                  <option value="1954">TRAJET (2)</option>
                  <option value="16191">TRAKKER (6)</option>
                  <option value="1690">TRANSPORTER (1)</option>
                  <option value="2763">TRANSPORTER (14)</option>
                  <option value="14234">TRAVERSE (40)</option>
                  <option value="1076">TRAVIQ (4)</option>
                  <option value="14080">TRAX (432)</option>
                  <option value="13290">TREZIA (27)</option>
                  <option value="530">TRIBUTE (4)</option>
                  <option value="613">TRITON (37)</option>
                  <option value="2125">TRUCK (15)</option>
                  <option value="765">TT (262)</option>
                  <option value="13287">TT ROADSTER (37)</option>
                  <option value="1643">TTS (18)</option>
                  <option value="738">TUCSON (2,857)</option>
                  <option value="1242">TUNDRA (83)</option>
                  <option value="13576">TURBO (1)</option>
                  <option value="1955">TUSCANI (1)</option>
                  <option value="648">TWIN (117)</option>
                  <option value="2557">TWINGO (50)</option>
                  <option value="16451">TWIZY (6)</option>
                  <option value="1285">UD (23)</option>
                  <option value="16203">UNIMOG (2)</option>
                  <option value="13825">UNIVERSE (31)</option>
                  <option value="13841">UP! (279)</option>
                  <option value="16408">URUS </option>
                  <option value="1286">URVAN </option>
                  <option value="16500">UX </option>
                  <option value="1120">V-CLASS </option>
                  <option value="880">V40 </option>
                  <option value="881">V50 </option>
                  <option value="15564">V60 </option>
                  <option value="882">V70 </option>
                  <option value="1584">V8 </option>
                  <option value="883">V90 </option>
                  <option value="346">VAMOS </option>
                  <option value="347">VAMOS HOBIO </option>
                  <option value="1305">VAMOS HOBIO PRO </option>
                  <option value="788">VANAGON </option>
                  <option value="1003">VANDEN PLAS</option>
                  <option value="1119">VANEO</option>
                  <option value="469">VANETTE TRUCK </option>
                  <option value="470">VANETTE VAN </option>
                  <option value="270">VANGUARD </option>
                  <option value="1586">VANTAGE</option>
                  <option value="855">VECTRA</option>
                  <option value="679">VEHICROSS </option>
                  <option value="271">VELLFIRE </option>
                  <option value="14337">VELLFIRE HYBRID </option>
                  <option value="13270">VELOSTER </option>
                  <option value="16044">VENZA </option>
                  <option value="739">VERACRUZ </option>
                  <option value="531">VERISA </option>
                  <option value="272">VEROSSA </option>
                  <option value="13546">VEZEL </option>
                  <option value="1121">VIANO </option>
                  <option value="1456">VIEWT </option>
                  <option value="1288">VIOLET </option>
                  <option value="1243">VIOS </option>
                  <option value="273">VISTA ARDEO </option>
                  <option value="274">VISTA SEDAN </option>
                  <option value="1874">VISTO </option>
                  <option value="857">VITA </option>
                  <option value="1405">VITARA </option>
                  <option value="275">VITZ </option>
                  <option value="15672">VITZ HYBRID </option>
                  <option value="1077">VIVIO </option>
                  <option value="790">VOLKSWAGEN OTHERS</option>
                  <option value="276">VOLTZ </option>
                  <option value="886">VOLVO OTHERS </option>
                  <option value="277">VOXY </option>
                  <option value="801">VOYAGER</option>
                  <option value="649">WAGON R </option>
                  <option value="16124">WAKE </option>
                  <option value="278">WILL CYPHA </option>
                  <option value="279">WILL VI </option>
                  <option value="280">WILL VS </option>
                  <option value="281">WINDOM </option>
                  <option value="472">WINGROAD </option>
                  <option value="1920">WINSTORM </option>
                  <option value="282">WISH </option>
                  <option value="680">WIZARD </option>
                  <option value="1173">WRANGLER </option>
                  <option value="16122">WRX S4 </option>
                  <option value="15938">X BEE </option>
                  <option value="653">X-90 </option>
                  <option value="16082">X-CLASS </option>
                  <option value="473">X-TRAIL </option>
                  <option value="13588">X-TRAIL HYBRID </option>
                  <option value="1004">X-TYPE </option>
                  <option value="13288">X1 </option>
                  <option value="1044">X3 </option>
                  <option value="15699">X4 </option>
                  <option value="1045">X5 </option>
                  <option value="1622">X6 </option>
                  <option value="16397">X7 </option>
                  <option value="16436">XC40 </option>
                  <option value="13311">XC60 </option>
                  <option value="884">XC70 </option>
                  <option value="885">XC90</option>
                  <option value="1005">XF </option>
                  <option value="16172">XF </option>
                  <option value="16173">XF105 </option>
                  <option value="1957">XG </option>
                  <option value="1591">XJ SERIES</option>
                  <option value="1592">XJ-S </option>
                  <option value="1593">XK SERIES </option>
                  <option value="1030">XLR </option>
                  <option value="1724">XSARA PICASSO </option>
                  <option value="16474">XT6 </option>
                  <option value="16055">XV </option>
                  <option value="2451">YANMAR OTHERS </option>
                  <option value="1244">YARIS </option>
                  <option value="16449">YARIS CROSS </option>
                  <option value="14400">YF SONATA </option>
                  <option value="14349">YPSILON </option>
                  <option value="723">YRV </option>
                  <option value="1978">YUKON </option>
                  <option value="349">Z </option>
                  <option value="1046">Z3 </option>
                  <option value="1047">Z4 </option>
                  <option value="1048">Z8 </option>
                  <option value="350">ZEST </option>
                  <option value="13877">ZEST SPARK </option>
                </select></div>
                <div className=" text-xl flex justify-between"><div>Fuel:</div> <select defaultValue={fl} onChange={onFuel} >
                  <option value="">any</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid(Diesel)">Hybrid(Diesel)</option>
                  <option value="Hybrid(Petrol)">Hybrid(Petrol)</option>
                  <option value="LPG">LPG</option>
                  <option value="CNG">CNG</option>
                </select> </div>
                <div className=" text-xl flex justify-between"><div>Year:</div> <select defaultValue={minYr} onChange={onMinYr} >
                  <option value="0">Min</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>

                </select>  <select defaultValue={maxYr} onChange={onMaxYr}>
                    <option value="2024">Max</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    <option value="1958">1958</option>
                    <option value="1957">1957</option>
                    <option value="1956">1956</option>
                    <option value="1955">1955</option>
                    <option value="1954">1954</option>
                    <option value="1953">1953</option>
                    <option value="1952">1952</option>
                    <option value="1951">1951</option>
                    <option value="1950">1950</option>
                  </select></div>
                <div className=" text-xl flex justify-between"><div>Transmission:</div> <select defaultValue={transmssn} onChange={onTransmsn} >
                  <option value="">Any</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select></div>
                <div className=" text-xl flex justify-between"><div>Steering:</div> <select defaultValue={str} onChange={onSteer} >
                  <option value="">Any</option>
                  <option value="Right">Right</option>
                  <option value="Left">Left</option>
                </select></div>
                <div className=" text-xl flex justify-between"><div>Engine cc:</div> <select defaultValue={minEng} onChange={onMinEng} >
                  <option value="0">Min</option>
                  <option value="700">700</option>
                  <option value="1000">1000</option>
                  <option value="1500">1500</option>
                  <option value="1800">1800</option>
                  <option value="2000">2000</option>
                  <option value="2500">2500</option>
                  <option value="3000">3000</option>
                  <option value="4000">4000</option>
                </select>  <select defaultValue={maxEng} onChange={onMaxEng}>
                    <option value="10000">Max</option>
                    <option value="700">700</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="1800">1800</option>
                    <option value="2000">2000</option>
                    <option value="2500">2500</option>
                    <option value="3000">3000</option>
                    <option value="4000">4000</option>
                  </select></div>
                <div className=" text-xl flex justify-between"><div>Mileage (km):</div> <select defaultValue={minMile} onChange={onMinMile} >
                  <option value="0">Min</option>
                  <option value="10000">10000</option>
                  <option value="30000">30000</option>
                  <option value="50000">50000</option>
                  <option value="80000">80000</option>
                  <option value="100000">100000</option>
                  <option value="150000">150000</option>
                  <option value="200000">200000</option>
                  <option value="300000">300000</option>

                </select>  <select defaultValue={maxMile} onChange={onMaxMile}>
                    <option value="1000000">Max</option>
                    <option value="10000">10000</option>
                    <option value="30000">30000</option>
                    <option value="50000">50000</option>
                    <option value="80000">80000</option>
                    <option value="100000">100000</option>
                    <option value="150000">150000</option>
                    <option value="200000">200000</option>
                    <option value="300000">300000</option>
                  </select></div>
                <div className=" text-xl flex justify-between"><div>Number of Seats:</div> <select defaultValue={sts} onChange={onSeats} >
                  <option value="">Any</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>

                </select></div>
                <div className=" text-xl flex justify-between"><div>WheelDrive:</div> <select defaultValue={wd} onChange={onWD} >
                  <option value="">Any</option>
                  <option value="2WD">2WD</option>
                  <option value="4WD">4WD</option>
                </select></div>
                <div className=" text-xl flex justify-between"><div>Color:</div> <select defaultValue={col} onChange={onColor} >
                  <option value="">Any</option>
                  <option value="Silver">Silver</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Pearl">Pearl</option>
                  <option value="Beige">Beige</option>
                  <option value="Blue">Blue</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Brown">Brown</option>
                  <option value="Gold">Gold</option>
                  <option value="Gray">Gray</option>
                  <option value="Green">Green</option>
                  <option value="Maroon">Maroon</option>
                  <option value="Orange">Orange</option>
                  <option value="Pink">Pink</option>
                  <option value="Purple">Purple</option>
                  <option value="Red">Red</option>
                  <option value="Yellow">Yellow</option>
                  <option value=" ">Other</option>
                </select></div>
                <div className=" text-xl flex justify-between"><div>Stock Location:</div> <select defaultValue={loc} onChange={onloc} >
                  <option value="">Any</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="UAE">UAE</option>
                  <option value="Korea">Korea</option>
                  <option value="Thailand">Thailand</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="USA">USA</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Georgia">Georgia</option>
                  <option value="China">China</option>
                </select></div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button className=" font-sans text-gray-900 text-xl" onClick={clear}>Clear</button>
              <Button onClick={advSearch}>Search</Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5 justify-between">
                <div className="">
                  <span className=" d-flex align-items-center gap-2">
                    <i class="ri-sort-asc"></i> Sort By
                  </span>
                  <select defaultValue={0} onChange={onSelectionChange}>
                    <option>Select</option>
                    <option value={1}>Price: Low to High</option>
                    <option value={2}>Price: High to Low</option>
                    <option value={0}>Recently Added</option>
                  </select>
                </div>
                <div className=" flex">

                  <button onClick={handleShow} className=" mx-2 font-sans font-semibold text-blue-700 text-xl"> Filter</button>
                  <div className="search__box bg-blue-700 ">
                    <input type="text" value={search} onChange={__handleSearch} placeholder="Search" />
                    <span>
                      <i class="ri-search-line"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            {Cars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      {Cars.length !== 0 ?
        <div className=' flex flex-row justify-center'>
          {pagination.map((Cars, index) => (
            <span
              key={index}
              className={Cars === Cars ? ' p-2 m-1 border-r-4 bg-blue-700 text-white cursor-pointer' : ' p-2 m-1 border-r-4 bg-slate-300 cursor-pointer'}
              onClick={() => { __handleChangePage(Cars) }}>
              {Cars}
            </span>
          ))}
        </div>
        :
        <div className=' flex flex-row justify-center'>
          <span className=' m-0 text-base text-gray-700 font-bold border-white'>No Cars</span>
        </div>
      }
    </Helmet>
  );
};

export default CarListing;
