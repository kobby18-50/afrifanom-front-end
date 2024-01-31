<script lang="ts">
	import { BASE_URL, type LOANS } from '$lib';
	import axios from 'axios';
    import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
	import { onMount } from 'svelte';

  let loans :LOANS [] = []

    onMount(async() => {
      await axios.get(`${BASE_URL}/loan`)
      .then(res => {
        loans = res.data.loans
      })
      .catch(err => {
        console.log(err)
      })
    })
    let searchTerm = '';
    
    $: filteredLoans = loans.filter((loan) => loan.customerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    const applyForLoan = () => {
        alert('apply')
    }
  </script>
  
  <TableSearch placeholder="Search by customer name" hoverable={true} bind:inputValue={searchTerm}>
    <TableHead>
      <TableHeadCell>Customer Name</TableHeadCell>
      <TableHeadCell>Loan Amount</TableHeadCell>
      <TableHeadCell>Amount Payable</TableHeadCell>
      <TableHeadCell>Interest</TableHeadCell>
      
      
    </TableHead>
    <TableBody>
      {#each filteredLoans as loan (loan._id)}
        <TableBodyRow>
          <TableBodyCell>{loan.customerName}</TableBodyCell>
          <TableBodyCell>${loan.loanamount}</TableBodyCell>
          <TableBodyCell>${loan.amountPayable}</TableBodyCell>
          <TableBodyCell>${loan.interest}</TableBodyCell>
          
          
        </TableBodyRow>
      {/each}
    </TableBody>
  </TableSearch>