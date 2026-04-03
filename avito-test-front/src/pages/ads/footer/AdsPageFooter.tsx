import type { JSX } from "react";
import { Pagination } from 'antd';
import './AdsPageFooter.css';

export type AdsPageFooterProps = {
  total: number;
  itemsPerPage: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function AdsPageFooter({ total, itemsPerPage, page, onPageChange }: AdsPageFooterProps): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="pagination-wrapper">
        <Pagination
          current={page}
          total={total}
          pageSize={itemsPerPage}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      </div>
    </footer>
  );
}