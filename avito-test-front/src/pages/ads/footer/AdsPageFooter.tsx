import type { JSX } from "react";
import { Pagination } from 'antd';
import './AdsPageFooter.css';

export type AdsPageFooterProps = {
  total?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function AdsPageFooter({total = 42, currentPage = 1, onPageChange }: AdsPageFooterProps): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="pagination-wrapper">
        <Pagination 
          current={currentPage}
          total={total} 
          pageSize={10}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      </div>
    </footer>
  );
}