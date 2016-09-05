ifneq ($(KERNELRELEASE),)

obj-m :=a_usb_management.o

else

KDIR := /lib/modules/$(shell uname -r)/build

all:
	make -C $(KDIR) M=$(shell pwd) modules

clean:
	rm -rf *.o *.ko .depend *.mod.o *.mod.c Module.* modules.* 

endif
