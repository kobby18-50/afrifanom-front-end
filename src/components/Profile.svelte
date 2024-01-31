<script lang="ts">
	import { Button, Input, Label } from "flowbite-svelte";
    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup'
    import { reporter, ValidationMessage } from '@felte/reporter-svelte';
    import axios from "axios";
	import { agentnamestore } from "$lib/stores/agentnamestore";
	import { rolestore } from "$lib/stores/rolestore";



  const namestore = $agentnamestore
const role = $rolestore


    // yup schema 
    const schema = yup.object().shape({
        name : yup.string().required(),
        phone : yup.string().required(),
        role : yup.string().required(),
    })

    // felte form

    const { form, isValid} = createForm({
        initialValues : {
            name : $agentnamestore,
            phone : '',
            role : $rolestore
            
        },

        onSubmit(values,ctx){
            const { name, phone, role } = values

            const data = {
              name : name as string,
              phone : phone as string,
              role : role as string
            }

            axios.patch('api/v1/user/updateUser', data)
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })

            // console.log(values)

            
        },

        extend : [
            validator({schema}), reporter
        ]
    })




console.log(namestore)
</script>


<section>
    <form use:form class="flex flex-col space-y-6">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Details</h3>
        <Label class="space-y-2">
          <span>Name</span>
          <Input name="name" disabled />
        </Label>

        <Label class="space-y-2">
          <span>Phone</span>
          <Input name="phone" />
        </Label>
        
        <Label class="space-y-2">
          <span>Role</span>
          <Input name="role" disabled/>
        </Label>
        
        <Button disabled = {$isValid ? false : true} type="submit">Update Profile</Button>
        
      </form>
</section>