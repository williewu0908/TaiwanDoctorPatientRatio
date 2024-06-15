import TaiwanSvg from './Taiwan.svg';
import styles from './interface.module.css';
import { useState } from 'react';
import Title from './Title';
import Tooltip from './Tooltip';

const defaultPlaceData = [
  { tag: "taipei_city", 地區: "臺北市", 每萬人西醫數: 45.1 },
  { tag: "new_taipei_city", 地區: "新北市", 每萬人西醫數: 15.69 },
  { tag: "taichung_city", 地區: "臺中市", 每萬人西醫數: 24.37 },
  { tag: "tainan_city", 地區: "臺南市", 每萬人西醫數: 21.37 },
  { tag: "kaohsiung_city", 地區: "高雄市", 每萬人西醫數: 26.03 },
  { tag: "keelung_city", 地區: "基隆市", 每萬人西醫數: 21.59 },
  { tag: "taoyuan_country", 地區: "桃園市", 每萬人西醫數: 19.5 },
  { tag: "hsinchu_city", 地區: "新竹市", 每萬人西醫數: 21.23 },
  { tag: "hsinchu_country", 地區: "新竹縣", 每萬人西醫數: 12.3 },
  { tag: "miaoli_country", 地區: "苗栗縣", 每萬人西醫數: 10.94 },
  { tag: "changhua_country", 地區: "彰化縣", 每萬人西醫數: 17.49 },
  { tag: "nantou_country", 地區: "南投縣", 每萬人西醫數: 13.73 },
  { tag: "yunlin_country", 地區: "雲林縣", 每萬人西醫數: 13.55 },
  { tag: "chiayi_city", 地區: "嘉義市", 每萬人西醫數: 35.81 },
  { tag: "chiayi_country", 地區: "嘉義縣", 每萬人西醫數: 18.14 },
  { tag: "pingtung_country", 地區: "屏東縣", 每萬人西醫數: 14.79 },
  { tag: "yilan_country", 地區: "宜蘭縣", 每萬人西醫數: 15.91 },
  { tag: "hualien_country", 地區: "花蓮縣", 每萬人西醫數: 28.38 },
  { tag: "taitung_country", 地區: "臺東縣", 每萬人西醫數: 15.37 },
  { tag: "penghu_country", 地區: "澎湖縣", 每萬人西醫數: 11.94 },
  { tag: "kinmen_country", 地區: "金門縣", 每萬人西醫數: 6.43 },
  { tag: "lienchiang_country", 地區: "連江縣", 每萬人西醫數: 13.19 }
];

export default function Interface() {
  const [placeData] = useState(defaultPlaceData);
  const [ratio, setRatio] = useState(22.3);
  const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0, content: '' });

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
