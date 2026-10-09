import { FC, useState } from "react";
import { Instrument } from "@components/instrument";
import { Menu, TMenuItem } from "@components/menu";
import styles from "./instrumentsUI.module.css";
import { TInstrumentsUIProps } from "./type";

export const InstrumentsUI: FC<TInstrumentsUIProps> = ({ categories }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeIndex = Math.min(
    activeCategoryIndex,
    Math.max(categories.length - 1, 0),
  );
  const activeCategory = categories[activeIndex];
  const menuItems: TMenuItem[] = categories.map(({ name }) => ({
    label: name,
    to: name,
  }));

  return (
    <section className={styles.instruments} aria-label="Инструменты">
      {menuItems.length > 0 && (
        <Menu
          items={menuItems}
          activeIndex={activeIndex}
          onSelect={setActiveCategoryIndex}
        />
      )}
      <div className={styles.list}>
        {activeCategory?.instruments.map((instrumentProps) =>
          instrumentProps.buttonState ? (
            <Instrument
              key={instrumentProps.instrument._id}
              instrument={instrumentProps.instrument}
              repetitionDate={instrumentProps.repetitionDate}
              repetitionPrice={instrumentProps.repetitionPrice}
              buttonState={instrumentProps.buttonState}
              buttonDisabled={instrumentProps.buttonDisabled}
              onBook={instrumentProps.onBook}
              hideSlotPrice={instrumentProps.hideSlotPrice}
            />
          ) : (
            <Instrument
              key={instrumentProps.instrument._id}
              instrument={instrumentProps.instrument}
              repetitionDate={instrumentProps.repetitionDate}
              repetitionPrice={instrumentProps.repetitionPrice}
              hideSlotPrice={instrumentProps.hideSlotPrice}
            />
          ),
        )}
      </div>
    </section>
  );
};
