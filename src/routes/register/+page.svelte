<script lang="ts">
	import { goto } from '$app/navigation';
    import axios from 'axios';
    import  toast, { Toaster } from 'svelte-french-toast';


    import { Button, Label, Input, Alert, Spinner } from 'flowbite-svelte'

    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup'
    import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { BASE_URL } from '$lib';
	import CustomSpinner from '../../components/CustomSpinner.svelte';


    let loading = false

    // yup schema 
    const schema = yup.object().shape({
        name : yup.string().min(10).required(),
        email : yup.string().email().required(),
        password : yup.string().min(8).required(),
        phone : yup.string().min(10).max(13).required()
    })

    // felte form

    const { form, isValid} = createForm({
        initialValues : {
            email : '',
            password : '',
            name : '',
            phone : ''
        },

        onSubmit(values,context){
            const {name, email,phone,password} = values

            const data = {
                name : name as string,
                email : email as string ,
                phone : phone as string,
                password : password as string
            }

            loading = true

            axios.post(`${BASE_URL}/auth/register`, data)
            .then((res) => {
                
                toast.success(res.data.msg)
                console.log(res)
                loading = false
                goto('/')
            }).catch((err) => {
                toast.error(err.message)
                console.log(err.message)
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
    <p class="text-center">Register as an agent</p>


    <form use:form class=" mx-80  mt-10">
        <div class="grid gap-5 border p-5 rounded-lg shadow-lg">
            <div >
                <Label class='mb-3' htmlFor='name'>Name</Label>
                <Input id='name' type='text' name='name'/>
                <ValidationMessage for='name' let:messages={message}>
                    {#if message}
                        <Alert class='capitalize mt-2'>
                            <span>{message || ''}</span>
                        </Alert>
                    {/if}
                </ValidationMessage>
            </div>
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
            <div >
                <Label class='mb-3' htmlFor='phone'>Phone</Label>
                <Input id='phone' type='tel' name='phone'/>
                <ValidationMessage for='phone' let:messages={message}>
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
                <Button disabled = {$isValid ? false : true} type='submit'>Register</Button>

                {/if}

                <p class="text-center">or</p>

                <small class='underline'><a href="/">Login instead</a></small>
            </div>
        </div>
    </form>
</section>