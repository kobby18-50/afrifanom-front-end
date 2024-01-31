<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Modal,
		Label,
		Input,
		Button,
		Checkbox,
		Alert
	} from 'flowbite-svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { BASE_URL, type CUSTOMERS } from '$lib';
	import { tokenStore } from '$lib/stores/tokenStore';
  import toast, { Toaster} from 'svelte-french-toast'
  import CustomSpinner from '../components/CustomSpinner.svelte'


	

  let loading = false

	

	

	let customers: CUSTOMERS[] = [];
	onMount(async () => {
		await axios
			.get(`${BASE_URL}/customer`)
			.then((res) => {
				customers = res.data.customers;
				console.log(customers);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	// yup schema
	const schema = yup.object().shape({
		name: yup.string().required(),
		loan: yup.number().required(),
		period: yup.number().required()
	});

	// felte form

	const { form, isValid } = createForm({
		initialValues: {
			name: '',
			loan: 0,
			payable: 0,
			period: 1
		},

		onSubmit(values, ctx) {
			const { loan, name, period } = values;

			console.log(values);

			const data = {
				loanamount: loan as number,
				loanperiod: period as number,
				customerName: name as number
			};

      loading = true
      const authorization = $tokenStore
			axios.post(`${BASE_URL}/loan`, data, {headers : { Authorization : `Bearer ${authorization}`}} )
      .then(res => {
        console.log(res)
        toast.success('Loan application successful')

        loading = false
        formModal = false
      })
      .catch(err => {
        console.log(err)
        toast.error(err.message)
        loading = false
        
      })
		},

		extend: [validator({ schema }), reporter]
	});

	let searchTerm = ''

	$: filteredCustomers = customers.filter(
		(customer) => customer.firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let formModal = false;

	const applyForLoan = async (id: string) => {
		formModal = true;
		// await axios
		// 	.get(`${BASE_URL}/customer/${id}`)
		// 	.then((res) => {
		// 		console.log(res.data);
				
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
        
		// 	});

		// console.log(id);
	};
</script>

<Toaster/>
<TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Employer</TableHeadCell>
		<TableHeadCell>Id number</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each filteredCustomers as customer}
			<TableBodyRow>
				<TableBodyCell>{customer.firstname}</TableBodyCell>
				<TableBodyCell>{customer.employer}</TableBodyCell>
				<TableBodyCell>{customer.idcard}</TableBodyCell>
				<TableBodyCell class="hover:cursor-pointer" on:click={() => applyForLoan(customer._id)}
					>Apply for loan</TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form use:form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Apply for Loan</h3>
		<Label class="space-y-2">
			<span>Customers Name</span>
			<Input name="name" />
		</Label>

		<Label class="space-y-2">
			<span>Loan Amount</span>
			<Input type="number" name="loan" />
		</Label>
		<ValidationMessage for="loan" let:messages={message}>
			{#if message}
				<Alert>
					<span>{message || ''}</span>
				</Alert>
			{/if}
		</ValidationMessage>

		<Label class="space-y-2">
			<span>Loan Period</span>
			<Input type="number" name="period" />
		</Label>
		<ValidationMessage for="period" let:messages={message}>
			{#if message}
				<Alert>
					<span>{message || ''}</span>
				</Alert>
			{/if}
		</ValidationMessage>

      {#if loading}
      <CustomSpinner/>

      {:else}

      <Button type="submit" class="w-full1">Apply for Loan</Button>

      {/if}
	</form>
</Modal>
