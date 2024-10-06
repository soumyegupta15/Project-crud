import { CommonModule, formatNumber } from '@angular/common';
import { Component, numberAttribute } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { log, table } from 'console';
import { parse } from 'path';
import { stringify } from 'querystring';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
})
export class InputFormComponent {
  userform!: FormGroup;
  constructor(_fb: FormBuilder) {
    this.userform = _fb.group({
      fname: ['', [Validators.required]],
      age: [''],
      mnum: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  countRows = 0;
  uniqueId = 0;
  isEditButtonActive = false;
  isSubmitButtonActive = true;
  updateId: any;
  tableRows: any[] = [];

  register(value:any) {
    if(this.isEditButtonActive){
      this.onUpdate(value)
    }
    else{
       this.addTableData();
    }
    console.log('The value of unique id after adding is : ' + this.uniqueId);
    console.log('The value of rows after adding is : ' + this.countRows);
    console.log(this.tableRows);

  }

  addTableData() {
    const table = document.getElementById('mytable');
    const row = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = this.userform.value.fname;
    row.appendChild(td1);

    const td2 = document.createElement('td');
    td2.innerHTML = this.userform.value.age;
    row.appendChild(td2);

    const td3 = document.createElement('td');
    td3.innerHTML = this.userform.value.mnum;
    row.appendChild(td3);

    table?.appendChild(row);

    this.tableRows.push({
      myid: this.uniqueId,
      myname: td1.innerHTML,
      myage: td2.innerHTML,
      mynum: td3.innerHTML,
    });

    const td4 = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.type = 'button';
    let k = this.uniqueId.toString();
    editButton.value = k;
    editButton.classList.add('custom')
    editButton.textContent = 'EDIT';
    editButton.addEventListener('click', () =>
      this.onEdit(parseInt(editButton.value))
    );
    td4.appendChild(editButton);
    row.appendChild(td4);


    const td5 = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('custom');
    deleteButton.value = this.uniqueId.toString();
    deleteButton.textContent = 'DELETE';
    deleteButton.addEventListener('click', () =>
      this.onDel(parseInt(deleteButton.value))
    );
    td5.appendChild(deleteButton);
    row.appendChild(td5);

    this.uniqueId++;
    this.countRows++;
  }

  onEdit(id: number) {
  this.isSubmitButtonActive = false;
    this.updateId = id;
    const index = this.tableRows.findIndex((row) => row.myid === id);
    console.log('THIS IS A EDIT BUTTON WITH ID ' + index);
    this.isEditButtonActive = true;
    this.userform.setValue({
      fname: this.tableRows[index].myname,
      age: this.tableRows[index].myage,
      mnum: this.tableRows[index].mynum,
    });
  }

  onUpdate(val: string) {
    const index1 = this.tableRows.findIndex((row) => row.myid === parseInt(val));
    this.tableRows[index1].myname = this.userform.value.fname;
    this.tableRows[(index1)].myage = this.userform.value.age;
    this.tableRows[(index1)].mynum = this.userform.value.mnum;
    console.log('the val is ' + (index1));
    
    const tables = document.getElementById('mytable') as HTMLTableElement
    tables.rows[(index1) + 1].cells[0].innerHTML =
      this.tableRows[(index1)].myname;
      tables.rows[(index1) + 1].cells[1].innerHTML =
        this.tableRows[(index1)].myage;
        tables.rows[(index1) + 1].cells[2].innerHTML =
          this.tableRows[(index1)].mynum;
          this.userform.reset()

    this.isEditButtonActive = false;
    this.isSubmitButtonActive = true;
  }

  onDel(id:number){
    const index = this.tableRows.findIndex((row) => row.myid === id);
    if (index !== -1) {
      this.tableRows.splice(index, 1);
      const table = document.getElementById('mytable') as HTMLTableElement;
      table.deleteRow(index + 1); 

      this.countRows--;
      console.log('Deleted row with ID: ' + id);
      console.log(this.tableRows);
    } else {
      console.error('Row with ID ' + id + ' not found.');
    }

  }

}

