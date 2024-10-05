import { Box, Heading, Image, Text , HStack, IconButton , useColorModeValue, useToast ,  Modal , ModalOverlay , ModalContent , ModalHeader , ModalFooter , ModalBody , ModalCloseButton, VStack, Input , useDisclosure, Button , } from '@chakra-ui/react'
import { EditIcon , DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product'
import { useState } from 'react'

const ProductCard = ({product}) => {
    const textColor = useColorModeValue( "gray.600" , "gray.200" )
    const bg = useColorModeValue( "white" , "gray.800" )

    const { deleteProducts , updateProducts } = useProductStore();
    const [ updatedProduct , setUpdatedProduct ] = useState(product);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handelDeleteProduct = async(pid)=>{

        const { success , message } = await deleteProducts(pid);
        if( !success ){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handelUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProducts(pid, updatedProduct); // Pass updatedProduct here
        if (success) {
            toast({
                title: 'Success',
                description: "Product Updated Successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        onClose();
    };

  return (
    <Box shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{ transform: "translateY( -5px )",shadow: 'xl' }}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit={'cover'} />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
                
            </Heading>

            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                ${" "+product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />}  colorScheme='blue' onClick={()=>onOpen()} />
                <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={ ()=> handelDeleteProduct(product._id) } />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader> Update Product </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e)=>setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />

                            <Input
                                placeholder='Price'
                                name='price'
                                value={updatedProduct.price}
                                onChange={(e)=>setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />

                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e)=>setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>(handelUpdateProduct(product._id , updatedProduct))} >
                            Update
                        </Button>
                        <Button variant={'ghost'} onClick={onClose} >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>

        </Modal>

    </Box>
  )
}

export default ProductCard;