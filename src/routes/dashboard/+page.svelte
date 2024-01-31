<script>
    import { Tabs, TabItem } from 'flowbite-svelte';
    import Icon from '@iconify/svelte';
	import Profile from '../../components/Profile.svelte';
	import Dashboard from '../../components/Dashboard.svelte';
	import AddCustomer from '../../components/AddCustomer.svelte';
	import Loans from '../../components/Loans.svelte';
	import Customers from '../../components/Customers.svelte';
    
  </script>
  
  <Tabs style="underline">
    <TabItem open>
        <div slot="title" class="flex items-center gap-2">
         
          Dashboard
        </div>
        <div>
            <Dashboard/>
        </div>
      </TabItem>
    <TabItem>
      <div slot="title" class="flex items-center gap-2">
        
        Customers
      </div>
      <Customers/>
    </TabItem>
   
    <TabItem>
      <div slot="title" class="flex items-center gap-2">
        
        Loans
      </div>
      <Loans/>
    </TabItem>
    <!-- <TabItem>
      <div slot="title" class="flex items-center gap-2">
       
        Profile
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <Profile/>
    </TabItem> -->
    <TabItem>
      <div slot="title" class="flex items-center gap-2">
       
        Add Customer
      </div>
      
       <AddCustomer/>
    </TabItem>
  </Tabs>