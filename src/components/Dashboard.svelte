<script lang="ts">
    import { Card, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch} from 'flowbite-svelte'
    import axios from 'axios';
	import { onMount } from 'svelte';
	import { BASE_URL, type USERS } from '$lib';

  let users:USERS[] = []

  let totalUsers : number

  let totalCustomers : number


    onMount(async ()=>{
      await axios.get(`${BASE_URL}/user`)
      .then(res => {
        console.log(res)
        users = res.data.users
        totalUsers = res.data.count
        
        
      })
      .catch((err) => {
        console.log(err)
      })


      await axios.get(`${BASE_URL}/customer`)
      .then(res => {
        console.log(res)
        
        totalCustomers = res.data.count      
        
      })
      .catch((err) => {
        console.log(err)
      })
    })

    let searchTerm = '';
   


    $: filteredUsers = users.filter((user) => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

</script>


<section class='grid grid-cols-3'>
    <Card>
        <p>Total number of customers</p>
        <p>{totalCustomers}</p>
    </Card>
    <Card>
        <p>Total number of agents</p>
        <p>{totalUsers}</p>
    </Card>
    <!-- <Card>
        <p>Total loans given</p>
        <p>2330</p>
    </Card> -->
    
</section>


<p class="my-10">Agents Details</p>

<TableSearch placeholder="Search by agent's name" hoverable={true} bind:inputValue={searchTerm}>
    <TableHead>
      <TableHeadCell>Agent Name </TableHeadCell>
      <TableHeadCell>Role</TableHeadCell>
      <TableHeadCell>Phone</TableHeadCell>  
    </TableHead>
    <TableBody>
      {#each filteredUsers as user}
        <TableBodyRow>
          <TableBodyCell>{user.name}</TableBodyCell>
          <TableBodyCell>{user.role}</TableBodyCell>
          <TableBodyCell>{user.phone}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </TableSearch>
