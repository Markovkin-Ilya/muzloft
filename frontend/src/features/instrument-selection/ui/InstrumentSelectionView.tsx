import { FC, useState } from "react";
import { Instrument } from "@entities/instrument";
import { Menu, TMenuItem } from "@shared/ui/menu";
import styles from "./InstrumentSelectionView.module.css";
import { TInstrumentSelectionViewProps } from "./type";

export const InstrumentSelectionView: FC<TInstrumentSelectionViewProps> = ({
  categories,
  initialCategoryIndex = 0,
  onCategoryChange,
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] =
    useState(initialCategoryIndex);
  const activeIndex = Math.min(
    activeCategoryIndex,
    Math.max(categories.length - 1, 0),
  );
  const activeCategory = categories[activeIndex];
  const menuItems: TMenuItem[] = categories.map(({ name }) => ({
    label: name,
    to: name,
  }));

  const handleSelect = (index: number) => {
    setActiveCategoryIndex(index);
    onCategoryChange?.(index);
  };

  if (categories.length === 0) {
    return (
      <p className={styles.message}>
        Инструменты по данному направлению не найдены
      </p>
    );
  }

  return (
    <section className={styles.instruments} aria-label="Инструменты">
      {menuItems.length > 0 && (
        <Menu
          items={menuItems}
          activeIndex={activeIndex}
          onSelect={handleSelect}
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
              onPhotoSelect={instrumentProps.onPhotoSelect}
            />
          ) : (
            <Instrument
              key={instrumentProps.instrument._id}
              instrument={instrumentProps.instrument}
              repetitionDate={instrumentProps.repetitionDate}
              repetitionPrice={instrumentProps.repetitionPrice}
              hideSlotPrice={instrumentProps.hideSlotPrice}
              onPhotoSelect={instrumentProps.onPhotoSelect}
            />
          ),
        )}
      </div>
    </section>
  );
};
