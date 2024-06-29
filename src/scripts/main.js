'use strict';

const table = document.querySelector('table');
const headers = document.querySelectorAll('th');
const trs = document.querySelectorAll('tr');

const people = [...trs].reduce((acc, item, index) => {
  if (index === 0 || index === trs.length - 1) {
    return acc;
  }

  return [
    ...acc,
    {
      name: item.children[0].textContent,
      position: item.children[1].textContent,
      age: parseInt(item.children[2].textContent),
      salary: parseFloat(item.children[3].textContent.replace(/[$,]/g, '')),
    },
  ];
}, []);

const handleSort = (e) => {
  switch (e.target.innerText) {
    case 'Name':
      people.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'Position':
      people.sort((a, b) => a.position.localeCompare(b.position));
      break;

    case 'Age':
      people.sort((a, b) => a.age - b.age);
      break;

    case 'Salary':
      people.sort((a, b) => a.salary - b.salary);
      break;
  }

  while (table.rows.length > 2) {
    table.deleteRow(1);
  }

  people.forEach((person) => {
    const row = document.createElement('tr');

    const salary = person.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    row.innerHTML = `
      <td>${person.name}</td>
      <td>${person.position}</td>
      <td>${person.age}</td>
      <td>${salary}</td>
    `;

    table.insertBefore(row, table.lastElementChild);
  });
};

headers.forEach((header) => {
  header.addEventListener('click', handleSort);
});
