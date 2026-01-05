import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { IndustryService } from '../../../../shared/services/industry-service';
import { MaterialModule } from '../../../../shared/material/material-module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IndustryView } from '../../../../shared/components/industry-view/industry-view';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-industry-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatTooltipModule  ],
  templateUrl: './industry-details.html',
  styleUrls: ['./industry-details.css']
})
export class IndustryDetails implements OnInit {

  displayedColumns: string[] = [
    'industry_name',
    'address',
    'state',
    'district',
    'sector_category',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);
  totalSize = 0;
  pageSize = 10;
  pageIndex = 0;
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private industryService: IndustryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.industryService.getIndustries({
      page: this.pageIndex + 1,
      limit: this.pageSize,
      search: this.searchText
    }).subscribe(res => {
      this.dataSource.data = res.data;
      this.totalSize = res.pagination.total;
      this.dataSource.sort = this.sort;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  onSearch(value: string) {
    this.searchText = value;
    this.pageIndex = 0;
    this.loadData();
  }

  onSort(sort: Sort) {
    this.pageIndex = 0;
    this.loadData();
  }

  viewDetails(id: string) {
    this.industryService.getDataById(id).subscribe(data => {
      this.dialog.open(IndustryView, {
        width: '65rem',
        maxHeight: '80vh',
        data
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['/dashboard/inspection', id]);
  }

  headerLabels: Record<string, string> = {
    id: "ID",
    industry_name: 'Name of the industry',
    address: 'Address',
    state: 'State', 
    district: 'District',
    sector_category: 'Sector',
    action: "Action"
  };

}
