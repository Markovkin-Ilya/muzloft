import { FC } from "react";
import { BaseCard } from "@entities/base";
import { Search } from "@shared/ui/search";
import magnifierIcon from "@assets/images/icons/magnifier.svg";
import styles from "./BaseListUI.module.css";
import { TBaseListUIProps } from "./type";

export const BaseListUI: FC<TBaseListUIProps> = ({
  bases,
  searchValue,
  onSearchChange,
  onBaseSelect,
}) => (
  <main className={styles.bases}>
    <Search
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Поиск по названию базы..."
      icon={
        <img
          src={magnifierIcon}
          alt=""
          className={styles.searchIcon}
          aria-hidden="true"
        />
      }
    />
    <section className={styles.list} aria-label="Список репетиционных баз">
      {bases.map((base) => (
        <BaseCard
          key={base._id}
          name={base.title}
          image={base.image}
          address={base.address}
          rating={base.rating}
          onClick={() => onBaseSelect(base._id)}
          onMap={() => {}}
        />
      ))}
      {bases.length === 0 && (
        <p className={styles.empty}>
          {searchValue ? "Базы не найдены" : "Список баз пока пуст"}
        </p>
      )}
    </section>
  </main>
);
