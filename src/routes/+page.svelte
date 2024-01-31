<script lang="ts">
	import { goto } from '$app/navigation';
    import axios from 'axios';


    import LOADIMG from '../assets/loanimg.jpg'
    import { Button, Label, Input, Alert } from 'flowbite-svelte'

    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup'
    import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { BASE_URL } from '$lib';

    import toast, { Toaster} from 'svelte-french-toast';
	import { agentnamestore } from '$lib/stores/agentnamestore';
	import { rolestore } from '$lib/stores/rolestore';
	import { tokenStore } from '$lib/stores/tokenStore';
	import CustomSpinner from '../components/CustomSpinner.svelte';


    let loading = false
    // yup schema 
    const schema = yup.object().shape({
        email : yup.string().email().required(),
        password : yup.string().min(8).required()
    })

    // felte form

    const { form, isValid} = createForm({
        initialValues : {
            email : '',
            password : ''
        },

        
         onSubmit(values,context){
            const {email, password} = values

            const data = {
                email : email as string,
                password : password as string
            }
            loading = true
            axios.post(`${BASE_URL}/auth/login`, data)
            .then((res) => {
                toast.success('Login Successful')

                console.log(res)

                const username = res.data.user.name

                const role = res.data.user.role

                const userToken = res.data.token

                agentnamestore.set(username)
                rolestore.set(role)
                tokenStore.set(userToken)

                loading = false
                
                    goto('/dashboard')
                

                
            }).catch((err) => {
                toast.error(err.message)
                console.log(err)
                loading = false
            })

        },

        extend : [
            validator({schema}), reporter
        ]
    })
</script>



<Toaster/>
<section class="mt-10">
    <p class="text-center">Login to your portal</p>


    <form use:form class=" mx-80  mt-10">
        <div class="grid gap-5 border p-5 rounded-lg shadow-lg">
            <div >
                <Label class='mb-3' htmlFor='email'>Email</Label>
                <Input id='email' type='email' name='email'/>
                <ValidationMessage for='email' let:messages={message}>
                    {#if message}
                        <Alert class='capitalize mt-2'>
                            <span>{message || ''}</span>
                        </Alert>
                    {/if}
                </ValidationMessage>
            </div>
            <div>
                <Label class='mb-3' htmlFor='password'>Password</Label>
                <Input id='password' type='password' name='password'/>
                <ValidationMessage for='password' let:messages={message}>
                    {#if message}
                        <Alert class='capitalize mt-2'>
                            <span>{message || ''}</span>
                        </Alert>
                    {/if}
                </ValidationMessage>
            </div>

            <div class="grid justify-center">
                {#if loading}
                <CustomSpinner/>
                {:else}

                <Button disabled = {$isValid ? false : true} type='submit'>Login</Button>
                {/if}

                <p class="text-center">or</p>

                <small class='underline'><a href="/register">Create an account</a></small>
            </div>
        </div>
    </form>
</section>