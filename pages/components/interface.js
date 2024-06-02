import TaiwanSvg from './Taiwan.svg';
import styles from './interface.module.css';
import { useEffect, useState } from 'react';
import csvToJson from 'csvtojson';
import Title from './Title';
import Tooltip from './Tooltip';

const csvFilePath = './DoctorPeopleRatio.csv';

const defaultPlaceData = [
  { tag: "taipei_city", 地區: "臺北市", 每萬人西醫數: 11.35 },
  { tag: "new_taipei_city", 地區: "新北市", 每萬人西醫數: 4.87 },
  { tag: "taichung_city", 地區: "臺中市", 每萬人西醫數: 3.87 },
  { tag: "tainan_city", 地區: "臺南市", 每萬人西醫數: 5.29 },
  { tag: "kaohsiung_city", 地區: "高雄市", 每萬人西醫數: 9.2 },
  { tag: "keelung_city", 地區: "基隆市", 每萬人西醫數: 5.29 },
  { tag: "taoyuan_country", 地區: "桃園市", 每萬人西醫數: 5.29 },
  { tag: "hsinchu_city", 地區: "新竹市", 每萬人西醫數: 5.29 },
  { tag: "hsinchu_country", 地區: "新竹縣", 每萬人西醫數: 5.29 },
  { tag: "miaoli_country", 地區: "苗栗縣", 每萬人西醫數: 5.29 },
  { tag: "changhua_country", 地區: "彰化縣", 每萬人西醫數: 5.29 },
  { tag: "nantou_country", 地區: "南投縣", 每萬人西醫數: 5.29 },
  { tag: "yunlin_country", 地區: "雲林縣", 每萬人西醫數: 5.29 },
  { tag: "chiayi_city", 地區: "嘉義市", 每萬人西醫數: 5.29 },
  { tag: "chiayi_country", 地區: "嘉義縣", 每萬人西醫數: 5.29 },
  { tag: "pingtung_country", 地區: "屏東縣", 每萬人西醫數: 5.29 },
  { tag: "yilan_country", 地區: "宜蘭縣", 每萬人西醫數: 6.23 },
  { tag: "hualien_country", 地區: "花蓮縣", 每萬人西醫數: 2.43 },
  { tag: "taitung_country", 地區: "臺東縣", 每萬人西醫數: 2.21 },
  { tag: "penghu_country", 地區: "澎湖縣", 每萬人西醫數: 2.92 },
  { tag: "kinmen_country", 地區: "金門縣", 每萬人西醫數: 2.3 },
  { tag: "lienchiang_country", 地區: "連江縣", 每萬人西醫數: 1.45 }
];

export default function Interface() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [placeData, setPlaceData] = useState(defaultPlaceData);
  const [ratio, setRatio] = useState(0.21);
  const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0, content: '' });

  useEffect(() => {
    const updateData = async () => {
      try {
        const response = await fetch(csvFilePath);
        const text = await response.text();
        const json = await csvToJson().fromString(text);

        const updatedPlaceData = defaultPlaceData.map(place => {
          const csvRow = json.find(row => row.地區 === place.地區);
          return csvRow
            ? { ...place, 每萬人西醫數: parseFloat(csvRow.每萬人西醫數) }
            : place;
        });

        setPlaceData(updatedPlaceData);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading CSV data:', error);
        setDataLoaded(true); // In case of error, we still set dataLoaded to true to hide the loading indicator
      }
    };

    updateData();
  }, []);

  const handlePathClick = (dataname) => {
    const result = placeData.find(obj => obj.tag === dataname);
    if (result) {
      setRatio(result.每萬人西醫數);
    }
  };

  const handleMouseOver = (e, dataName) => {
    const result = placeData.find((obj) => obj.tag === dataName);
    if (result) {
      setTooltip({
        display: true,
        x: e.clientX,
        y: e.clientY,
        content: `${result.地區}`
      });
    }
  };

  const handleMouseMove = (e) => {
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY
    }));
  };

  const handleMouseOut = () => {
    setTooltip({ display: false, x: 0, y: 0, content: '' });
  };

  if (!dataLoaded) {
    return <div>Loading...</div>; // Show loading indicator while data is being loaded
  }

  return (
    <>
      <Title ratio={ratio}/>
      <div className={styles.taiwan}>
        <TaiwanSvg
          fill='true'
          onClick={(e) => handlePathClick(e.target.getAttribute('data-name'))}
          onMouseOver={(e) => handleMouseOver(e, e.target.getAttribute('data-name'))}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
        />
        <Tooltip {...tooltip} />
      </div>
    </>
  );
}
