<script lang="ts">
	import { Label, Input, Select, Button, Alert } from 'flowbite-svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import axios from 'axios';
	import { BASE_URL } from '$lib';
	import { tokenStore } from '$lib/stores/tokenStore';
    import toast, {Toaster} from 'svelte-french-toast';
	import CustomSpinner from './CustomSpinner.svelte';

	const maritalStatus = [
		{
			id: 1,
			value: 'single',
			name: 'Single'
		},
		{
			id: 2,
			value: 'divorced',
			name: 'Divorced'
		},
		{
			id: 3,
			value: 'married',
			name: 'Married'
		}
	];

    let loading = false

	// yup schema
	const schema = yup.object().shape({
		firstname: yup.string().min(5).required(),
		othername: yup.string(),
		lastname: yup.string().min(5).required(),
		maritalStatus: yup.string().required(),
		idcard: yup.string().required(),
		phone: yup.string().required().max(13),
		employer: yup.string().required(),
		dob: yup.string().required(),
		address: yup.string().required()
	});

	// felte form

	const { form, isValid } = createForm({
		initialValues: {
			firstname: '',
			othername: '',
			lastname: '',
			maritalStatus: '',
			idcard: '',
			phone: '',
			employer: '',
			dob: '',
			address: ''
		},

		onSubmit(values, ctx) {
			const {
				firstname,
				othername,
				lastname,
				maritalStatus,
				idcard,
				phone,
				employer,
				dob,
				address
			} = values;

			const data = {
				firstname: firstname as string,
				othername: othername as string,
				lastname:  lastname as string,
				maritalStatus: maritalStatus as string,
				idcard: idcard as string,
				phone: phone as string,
				employer: employer as string,
				dob: dob as string,
				address: address as string
			};

            const authorization = $tokenStore

            loading = true
            axios.post(`${BASE_URL}/customer`, data, { headers : {Authorization : `Bearer ${authorization}`}})
            .then(res => {
                console.log(res)
                toast.success('Customer Added')
                loading = false
            })
            .catch(err => {
                console.log(err)
                toast.error(err.message)
                loading = false
            })

		},

		extend: [validator({ schema }), reporter]
	});
</script>

<Toaster/>
<section>
	<form use:form>
		<div class="my-5 grid grid-cols-3 gap-x-5 gap-y-7">
			<div>
				<Label class="mb-3" htmlFor="firstname">First Name</Label>
				<Input id="firstname" name="firstname" />
				<ValidationMessage for="firstname" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>
			<div>
				<Label class="mb-3" htmlFor="othername">Other Name</Label>
				<Input id="othername" name="othername" />
				<ValidationMessage for="othername" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>
			<div>
				<Label class="mb-3" htmlFor="lastname">Last Name</Label>
				<Input id="lastname" name="lastname" />
				<ValidationMessage for="lastname" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>
		</div>

		<div class="mb-5 grid grid-cols-3 gap-x-3">
			<div>
				<Label class="mb-3" htmlFor="maritalStatus">Marital Status</Label>
				<Select name="maritalStatus" id="maritalStatus">
					{#each maritalStatus as { value, name, id } (id)}
						<option {value}>{name}</option>
					{/each}
				</Select>
				<ValidationMessage for="maritalStatus" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>

			<!-- ID CARD -->
			<div>
				<Label class="mb-3" htmlFor="idcard">Id Card</Label>
				<Input id="idcard" name="idcard" />
				<ValidationMessage for="idcard" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>
			<!-- phone number -->
			<div>
				<Label class="mb-3" htmlFor="phone">Phone Number</Label>
				<Input id="phone" type="tel" name="phone" />
				<ValidationMessage for="phone" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>
		</div>

		<div class="grid gap-y-3">
			<!-- name of employer -->
			<div>
				<Label class="mb-3" htmlFor="employer">Name of Employer</Label>
				<Input id="employer" name="employer" />
				<ValidationMessage for="employer" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>

			<!-- dob -->
			<div>
				<Label class="mb-3" htmlFor="dob">Date of Birth</Label>
				<Input id="dob" type="date" name="dob" />
				<ValidationMessage for="date" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>

			<!-- address -->
			<div>
				<Label class="mb-3" htmlFor="address">Address</Label>
				<Input id="address" name="address" />
				<ValidationMessage for="address" let:messages={message}>
					{#if message}
						<Alert class="mt-2">{message || ''}</Alert>
					{/if}
				</ValidationMessage>
			</div>
		</div>

		<!-- <Button type='submit' class='mt-5'>Add Customer</Button> -->
		{#if loading}
            <CustomSpinner/>

        {:else}
        <Button disabled={$isValid ? false : true} type="submit" class="mt-5">Add Customer</Button>
        {/if}
	</form>
</section>
