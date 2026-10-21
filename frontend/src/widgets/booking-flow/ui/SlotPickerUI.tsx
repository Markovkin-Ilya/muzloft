import { FC } from "react";
import { Menu } from "@shared/ui/menu";
import styles from "./SlotPickerUI.module.css";

export type TSlotPickerDay = {
  key: string;
  date: string; // 01.09
  weekday: string; // вт
};

export type TSlotPickerHour = {
  hour: number;
  label: string;
  busy: boolean;
  selected: boolean;
  tone: number;
};

export type TSlotPickerLegendItem = { price: number; tone: number };

export type TSlotPickerUIProps = {
  days: TSlotPickerDay[];
  activeDayKey: string;
  hours: TSlotPickerHour[];
  legend: TSlotPickerLegendItem[];
  onDayChange: (key: string) => void;
  onHourClick: (hour: number) => void;
};

export const SlotPickerUI: FC<TSlotPickerUIProps> = ({
  days,
  activeDayKey,
  hours,
  legend,
  onDayChange,
  onHourClick,
}) => {
  const activeDayIndex = days.findIndex((day) => day.key === activeDayKey);

  return (
    <section className={styles.picker}>
      <div className={styles.days}>
        <Menu
          items={days.map((day) => ({
            label: `${day.date} ${day.weekday}`,
            to: day.key,
          }))}
          activeIndex={Math.max(activeDayIndex, 0)}
          onSelect={(index) => {
            const day = days[index];
            if (day) {
              onDayChange(day.key);
            }
          }}
        />
      </div>

      <div className={styles.card}>
        <p className={styles.duration}>Стоимость за 1 час</p>
        <ul className={styles.legend}>
          {legend.map((item) => (
            <li key={item.price} className={styles.legendItem}>
              <span className={`${styles.dot} ${styles[`tone${item.tone}`]}`} />
              {item.price}
            </li>
          ))}
        </ul>
        <div className={styles.grid}>
          {hours.map((hour) => (
            <button
              key={hour.hour}
              type="button"
              disabled={hour.busy}
              aria-pressed={hour.selected}
              className={[
                styles.hour,
                styles[`tone${hour.tone}`],
                hour.busy ? styles.busy : "",
                hour.selected ? styles.selected : "",
              ].join(" ")}
              onClick={() => onHourClick(hour.hour)}
            >
              {hour.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
